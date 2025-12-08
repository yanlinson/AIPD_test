#!/usr/bin/env node

// src/types.ts
function getConfigFromEnv() {
  const config = {};
  if (process.env.GIT_AUTO_TAG_MIN_INTERVAL) {
    const val = parseInt(process.env.GIT_AUTO_TAG_MIN_INTERVAL, 10);
    if (!isNaN(val))
      config.minInterval = val * 1000;
  }
  if (process.env.GIT_AUTO_TAG_MIN_FILES) {
    const val = parseInt(process.env.GIT_AUTO_TAG_MIN_FILES, 10);
    if (!isNaN(val))
      config.minFiles = val;
  }
  if (process.env.GIT_AUTO_TAG_MIN_LINES) {
    const val = parseInt(process.env.GIT_AUTO_TAG_MIN_LINES, 10);
    if (!isNaN(val))
      config.minLines = val;
  }
  if (process.env.GIT_AUTO_TAG_DEBUG === "1" || process.env.GIT_AUTO_TAG_DEBUG === "true") {
    config.debug = true;
  }
  return config;
}
var BASE_CONFIG = {
  minInterval: 5 * 60 * 1000,
  minFiles: 2,
  minLines: 50,
  excludePatterns: [
    "*.log",
    "*.tmp",
    ".DS_Store",
    "node_modules/",
    "dist/",
    ".cache/",
    ".last-commit"
  ],
  debug: false
};
var DEFAULT_CONFIG = {
  ...BASE_CONFIG,
  ...getConfigFromEnv()
};

// src/hook-utils.ts
import { execSync, spawnSync } from "child_process";
import * as fs from "fs";
import * as path from "path";
function getHookDataDir() {
  const projectDir = process.env.CLAUDE_PROJECT_DIR || process.cwd();
  return path.join(projectDir, ".claude", "hooks", "git-auto-tag-v2");
}
function getLastCommitFilePath() {
  return path.join(getHookDataDir(), ".last-commit");
}
function log(message, level = "info") {
  if (level === "debug" && !DEFAULT_CONFIG.debug) {
    return;
  }
  const prefix = level === "error" ? "[git-auto-tag ERROR]" : "[git-auto-tag]";
  console.error(`${prefix} ${message}`);
}
function readStdin() {
  return new Promise((resolve, reject) => {
    let data = "";
    process.stdin.setEncoding("utf8");
    process.stdin.on("data", (chunk) => data += chunk);
    process.stdin.on("end", () => {
      try {
        const parsed = JSON.parse(data);
        log(`Received input for session: ${parsed.session_id || "unknown"}`, "debug");
        resolve(parsed);
      } catch (e) {
        log(`Failed to parse stdin: ${e}`, "error");
        reject(new Error("Failed to parse stdin"));
      }
    });
    process.stdin.on("error", (e) => {
      log(`stdin error: ${e}`, "error");
      reject(e);
    });
  });
}
function exitHook(code = 0, reason) {
  if (reason) {
    log(reason, code === 0 ? "debug" : "info");
  }
  process.exit(code);
}
function getTimestamp() {
  return new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19);
}
function isGitRepo() {
  try {
    execSync("git rev-parse --is-inside-work-tree", {
      stdio: "pipe",
      encoding: "utf8"
    });
    return true;
  } catch {
    log("Not a git repository", "debug");
    return false;
  }
}
function getLastCommitTime() {
  const filePath = getLastCommitFilePath();
  try {
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, "utf8").trim();
      const time = parseInt(content, 10);
      if (!isNaN(time)) {
        log(`Last commit time: ${new Date(time).toISOString()}`, "debug");
        return time;
      }
    }
  } catch (e) {
    log(`Failed to read last commit time: ${e}`, "debug");
  }
  return 0;
}
function saveCommitTime() {
  const filePath = getLastCommitFilePath();
  try {
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(filePath, Date.now().toString());
    log("Saved commit time", "debug");
  } catch (e) {
    log(`Failed to save commit time: ${e}`, "error");
  }
}
function shouldExcludeFile(filePath, patterns) {
  for (const pattern of patterns) {
    if (pattern.endsWith("/")) {
      if (filePath.startsWith(pattern) || filePath.includes(`/${pattern}`)) {
        return true;
      }
    } else if (pattern.startsWith("*.")) {
      const ext = pattern.slice(1);
      if (filePath.endsWith(ext)) {
        return true;
      }
    } else {
      if (filePath === pattern || filePath.endsWith(`/${pattern}`)) {
        return true;
      }
    }
  }
  return false;
}
function getDiffStats(config = DEFAULT_CONFIG) {
  try {
    const filesOutput = execSync("git diff --name-only HEAD 2>/dev/null || git diff --name-only", {
      encoding: "utf8",
      stdio: ["pipe", "pipe", "pipe"]
    });
    const allFiles = filesOutput.trim().split(`
`).filter(Boolean);
    const filteredFiles = allFiles.filter((f) => !shouldExcludeFile(f, config.excludePatterns));
    if (filteredFiles.length === 0) {
      log("No files to commit after exclusion filter", "debug");
      return { filesChanged: 0, insertions: 0, deletions: 0, totalLines: 0 };
    }
    const output = execSync("git diff --stat HEAD 2>/dev/null || git diff --stat", {
      encoding: "utf8",
      stdio: ["pipe", "pipe", "pipe"]
    });
    const lines = output.trim().split(`
`);
    const summaryLine = lines[lines.length - 1];
    const filesMatch = summaryLine.match(/(\d+)\s+files?\s+changed/);
    const insertMatch = summaryLine.match(/(\d+)\s+insertions?\(\+\)/);
    const deleteMatch = summaryLine.match(/(\d+)\s+deletions?\(-\)/);
    const filesChanged = filteredFiles.length;
    const insertions = insertMatch ? parseInt(insertMatch[1], 10) : 0;
    const deletions = deleteMatch ? parseInt(deleteMatch[1], 10) : 0;
    log(`Diff stats: ${filesChanged} files, +${insertions}/-${deletions} lines`, "debug");
    return {
      filesChanged,
      insertions,
      deletions,
      totalLines: insertions + deletions
    };
  } catch (e) {
    log(`Failed to get diff stats: ${e}`, "error");
    return { filesChanged: 0, insertions: 0, deletions: 0, totalLines: 0 };
  }
}
function hasUncommittedChanges() {
  try {
    const status = execSync("git status --porcelain", {
      encoding: "utf8",
      stdio: ["pipe", "pipe", "pipe"]
    });
    const hasChanges = status.trim().length > 0;
    log(`Has uncommitted changes: ${hasChanges}`, "debug");
    return hasChanges;
  } catch (e) {
    log(`Failed to check git status: ${e}`, "error");
    return false;
  }
}
function gitAdd() {
  try {
    execSync("git add .", {
      stdio: "pipe",
      encoding: "utf8"
    });
    log("Staged all changes", "debug");
    return true;
  } catch (e) {
    log(`git add failed: ${e}`, "error");
    return false;
  }
}
function gitCommit(message) {
  try {
    const result = spawnSync("git", ["commit", "-m", message], {
      stdio: "pipe",
      encoding: "utf8"
    });
    if (result.status === 0) {
      log(`Committed: ${message}`, "info");
      return true;
    } else {
      log(`git commit failed: ${result.stderr}`, "error");
      return false;
    }
  } catch (e) {
    log(`git commit error: ${e}`, "error");
    return false;
  }
}
function getLatestTag() {
  try {
    const tags = execSync("git tag --sort=-v:refname", {
      encoding: "utf8",
      stdio: ["pipe", "pipe", "pipe"]
    }).trim().split(`
`).filter(Boolean);
    for (const tag of tags) {
      if (/^\d+\.\d+\.\d+$/.test(tag)) {
        log(`Latest tag: ${tag}`, "debug");
        return tag;
      }
    }
    log("No semver tag found", "debug");
    return null;
  } catch (e) {
    log(`Failed to get latest tag: ${e}`, "debug");
    return null;
  }
}
function incrementVersion(currentTag) {
  if (!currentTag) {
    return "0.0.1";
  }
  const parts = currentTag.split(".").map(Number);
  if (parts.length !== 3 || parts.some(isNaN)) {
    return "0.0.1";
  }
  parts[2] += 1;
  const newVersion = parts.join(".");
  log(`Version increment: ${currentTag} -> ${newVersion}`, "debug");
  return newVersion;
}
function gitTag(version) {
  try {
    if (!/^\d+\.\d+\.\d+$/.test(version)) {
      log(`Invalid version format: ${version}`, "error");
      return false;
    }
    const result = spawnSync("git", ["tag", version], {
      stdio: "pipe",
      encoding: "utf8"
    });
    if (result.status === 0) {
      log(`Created tag: ${version}`, "info");
      return true;
    } else {
      log(`git tag failed: ${result.stderr}`, "error");
      return false;
    }
  } catch (e) {
    log(`git tag error: ${e}`, "error");
    return false;
  }
}

// src/hook.ts
async function main() {
  try {
    log("Hook started", "debug");
    await readStdin();
    if (!isGitRepo()) {
      exitHook(0, "Not a git repository, skipping");
    }
    if (!hasUncommittedChanges()) {
      exitHook(0, "No uncommitted changes, skipping");
    }
    const lastCommitTime = getLastCommitTime();
    const now = Date.now();
    const elapsed = now - lastCommitTime;
    if (elapsed < DEFAULT_CONFIG.minInterval) {
      const remainingMinutes = Math.ceil((DEFAULT_CONFIG.minInterval - elapsed) / 60000);
      exitHook(0, `Time threshold not met (${remainingMinutes}min remaining), skipping`);
    }
    const stats = getDiffStats(DEFAULT_CONFIG);
    const meetsFileThreshold = stats.filesChanged >= DEFAULT_CONFIG.minFiles;
    const meetsLineThreshold = stats.totalLines >= DEFAULT_CONFIG.minLines;
    if (!meetsFileThreshold && !meetsLineThreshold) {
      exitHook(0, `Change threshold not met (files: ${stats.filesChanged}/${DEFAULT_CONFIG.minFiles}, lines: ${stats.totalLines}/${DEFAULT_CONFIG.minLines}), skipping`);
    }
    log(`Thresholds met: files=${stats.filesChanged}, lines=${stats.totalLines}`, "debug");
    if (!gitAdd()) {
      exitHook(0, "git add failed, skipping");
    }
    const timestamp = getTimestamp();
    const message = `Auto: ${timestamp} - ${stats.filesChanged} files, ${stats.totalLines} lines`;
    if (!gitCommit(message)) {
      exitHook(0, "git commit failed, skipping");
    }
    const latestTag = getLatestTag();
    const newTag = incrementVersion(latestTag);
    if (gitTag(newTag)) {
      log(`Auto-committed and tagged: ${newTag}`, "info");
    }
    saveCommitTime();
    exitHook(0);
  } catch (e) {
    log(`Unexpected error: ${e}`, "error");
    exitHook(0);
  }
}
main();
