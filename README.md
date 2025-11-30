# 🎮 Gobang Pro+ (五子棋专业版)

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Version](https://img.shields.io/badge/version-2.0.0-green.svg)
![Tech](https://img.shields.io/badge/tech-Vanilla%20JS%20%7C%20HTML5-orange.svg)

一个基于原生 Web 技术构建的高性能、单文件五子棋应用。内置三种难度的 AI 引擎、完整的复盘系统以及优雅的 UI 交互。

## ✨ 核心特性

### 🤖 智能 AI 引擎
- **新手模式 (Beginner)**：适合初学者，AI 会偶尔失误，防守意识较弱。
- **业余模式 (Amateur)**：基于贪婪算法 (Greedy Heuristic)，攻守平衡，适合休闲对战。
- **大师模式 (Master)**：集成 **Minimax (深度2)** 搜索与剪枝算法，具备预判能力，极具挑战性。

### 🛠️ 完备的功能系统
- **对战模式**：支持 PvE (人机) 和 PvP (双人同屏) 切换。
- **执子选择**：自由选择执黑（先手）或执白（后手）。
- **复盘分析**：支持全盘录像回放，可单步前进/后退，方便赛后分析。
- **辅助功能**：
  - 💡 **智能提示**：不知道下哪？让大师级 AI 给你支招。
  - ↩️ **悔棋系统**：人机模式下智能回退两步，保持执子顺序。

### 🎨 极致的工程设计
- **Zero Dependency**：无任何第三方库（No React/Vue/jQuery），纯原生代码。
- **Single File**：所有逻辑（HTML/CSS/JS）封装在一个 `.html` 文件中，即开即用。
- **Responsive**：完美适配桌面端与移动端触摸操作。
- **Visuals**：纯 CSS 绘制的拟真棋子与木纹棋盘，无外部图片资源。

## 🚀 快速开始

### 方式一：直接运行
1. 下载本项目中的 `GobangGame.html` 。
2. 双击在浏览器中打开即可。

### 方式二：开发调试
如果你想进行二次开发：

```bash
# 克隆项目
git clone https://github.com/your-username/gobang-pro.git

# 进入目录
cd gobang-pro

# 使用任意静态服务器启动 (例如 python)
python -m http.server 8000
```

## 🧠 算法原理解析

本项目 AI 采用分层设计：

1.  **评估函数 (Evaluation Function)**：
    基于棋型（活四、冲四、活三等）给予评分。
    - `Win (5)`: 100,000 分
    - `Open 4`: 10,000 分
    - `Open 3`: 1,000 分

2.  **决策树 (Decision Making)**：
    - **业余级**：遍历空位，计算 `AttackScore + DefenseScore`，取最高分。
    - **大师级**：
        1. 筛选 Top 8 高分点作为候选 (Candidates)。
        2. 对每个候选点进行模拟落子。
        3. 预测对手的最强回应 (Minimax 思想)。
        4. 选择 `(自己得分 - 对手回应得分)` 最大的点。

## 📂 文件结构

```text
gobang-pro/
├── index.html      # 核心源代码 (包含 HTML/CSS/JS)
├── README.md       # 项目说明文档
└── package.json    # 项目元数据
```

## 🤝 贡献指南

欢迎提交 Issue 或 Pull Request！
- 如果你发现了 AI 的逻辑漏洞（比如它没看到你的四连），请截图并描述复现步骤。
- 如果你有更高效的 Minimax 剪枝算法实现，欢迎优化 `getBestMoveMaster` 函数。


## 📄 许可证

MIT License

