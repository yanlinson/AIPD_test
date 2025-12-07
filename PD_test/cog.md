---
name: english-writing-tutor-cog
description: 英语写作导师项目的认知模型
---

# 认知模型 (Cog)

> 认知模型基于人心系统模型（感性-智商-理商），核心框架是：**智能体 + 信息 + 上下文**
>
> **核心原则**：
> - 每个实体需要：**唯一编码**（如何被识别）、**分类方式**（人类明确，避免AI乱分类）
> - 不是让你掌握很多先验知识，而是让AI意识到你是什么样的人
> - 使用XML语义闭合标签

## 简明写法

<cog>
本系统包括以下关键实体：
- user：用户
  - student：学生（中国高中生），一种特殊的user
  - admin：管理员（英语教师），一种特殊的user
- english_essay：英语作文
  - practical_writing：应用文，一种特殊的english_essay
  - story_continuation：读后续写，一种特殊的english_essay
  - draft：草稿，一种特殊的english_essay
  - final_version：最终版本，一种特殊的english_essay
- polish：润色
  - grammar_polish：语法润色，一种特殊的polish
  - vocabulary_polish：词汇润色，一种特殊的polish
  - coherence_polish：连贯性润色，一种特殊的polish
  - task_polish：任务完成度润色，一种特殊的polish
- feedback：反馈
  - grammar_feedback：语法反馈，一种特殊的feedback
  - content_feedback：内容反馈，一种特殊的feedback
  - structure_feedback：结构反馈，一种特殊的feedback
</cog>

<user>
- 唯一编码：按照注册时间次序生成的UUID号
- 常见分类：游客；注册用户；学生（中国高中生）；管理员（英语教师）
</user>

<student>
- 唯一编码：每个学生有个独立的学号，例如G202501001（G表示高中）
- 常见分类：高一学生；高二学生；高三学生；高考备考学生
</student>

<english_essay>
- 唯一编码：按照作文提交时间编码，例如20251207-EN-001
- 常见分类：应用文（书信、邮件、通知、演讲稿）；读后续写（故事续写）
</english_essay>

<practical_writing>
- 唯一编码：在英语作文编码基础上加类型，例如20251207-EN-PW-001
- 常见分类：书信（正式/非正式）；邮件；通知；演讲稿；申请信
</practical_writing>

<story_continuation>
- 唯一编码：在英语作文编码基础上加类型，例如20251207-EN-SC-001
- 常见分类：记叙文续写；故事结尾续写；情景对话续写
</story_continuation>

<draft>
- 唯一编码：在作文编码基础上加版本号，例如20251207-EN-001-v1
- 常见分类：初稿；修改稿；润色稿；最终稿
</draft>

<polish>
- 唯一编码：按照润色操作时间编码，例如20251207-EN-001-p1
- 常见分类：语法润色（时态、语态、主谓一致）；词汇润色（用词准确性、丰富性）；连贯性润色（连接词、段落衔接）；任务完成度润色（是否符合题目要求）
</polish>

<feedback>
- 唯一编码：按照反馈时间编码，例如20251207-EN-001-f1
- 常见分类：语法反馈（错误修正）；内容反馈（内容充实度）；结构反馈（段落组织）；任务完成度反馈（是否完成题目要求）
</feedback>

<rel>
- student-english_essay：一对多（一个学生可提交多篇英语作文）
- english_essay-draft：一对多（一篇英语作文有多个草稿版本）
- english_essay-polish：一对多（一篇英语作文可进行多次润色）
- polish-feedback：一对多（一次润色可产生多个反馈）
- admin-english_essay：一对多（一个英语教师可管理多篇学生作文）
</rel>

---

## 上下文信息

<context>

### 业务上下文
英语写作导师是一个专门帮助中国高中生提高英语写作水平的AI辅助工具。系统针对中国高中英语教学的实际需求，重点支持应用文和读后续写两种高考常见题型。通过智能算法分析学生英语作文，提供语法、词汇、连贯性等方面的润色建议，同时记录学生的英语写作过程和进步轨迹。

### 用户上下文
**主要用户**：
1. **学生**：中国高中生，需要提高英语写作水平，应对高考英语写作要求
2. **管理员**：英语教师，负责管理学生作文数据库、分析写作质量和改进教学方法

**用户特点**：
- 学生：英语作为第二语言学习者，常见问题包括中式英语、语法错误、词汇匮乏、逻辑不连贯
- 教师：需要了解学生整体水平和个体差异，进行针对性教学

**用户需求**：
- 学生：获得针对英语作为第二语言的写作指导，提高高考英语写作分数
- 教师：收集学生英语写作数据，分析常见错误类型，改进课堂教学

### 技术上下文
- 系统基于AI算法进行英语作文分析，特别针对中国学生的常见错误
- 支持多种润色模式，针对英语写作的特殊性
- 包含反馈和反思机制，帮助学生从错误中学习
- 有严格的API调用限制和数据权限控制，符合教育场景要求
- 支持英语写作的特殊需求：语法检查、词汇建议、连贯性改进

### 认知模型核心概念

#### 1. 自主润色（针对英语写作）
学生可以根据自己的需求选择英语润色方式：
- **语法润色**：修正英语语法错误（时态、语态、主谓一致、冠词使用等）
- **词汇润色**：替换中式英语表达，使用更地道的英语词汇
- **连贯性润色**：优化英语段落衔接，添加合适的连接词
- **任务完成度润色**：确保作文符合题目要求，完成所有任务点

#### 2. 算法润色（针对英语作为第二语言）
系统自动分析英语作文并提供润色建议：
- **工作流程**：输入英语作文 → 分析语言问题 → 生成改进建议 → 展示对比结果
- **智能程度**：根据作文类型（应用文/读后续写）自动调整润色策略
- **个性化**：考虑学生的英语水平和常见错误类型（中式英语、语法错误等）

#### 3. 反省心智（英语学习反思）
学生通过系统反馈进行英语学习反思：
- **反思机制**：对比原稿和润色稿，理解英语表达改进之处
- **学习记录**：记录每次英语润色的收获，建立错误本
- **风格形成**：逐渐形成符合英语表达习惯的写作风格

#### 4. 智能推荐（基于英语学习数据）
系统基于学生英语写作数据提供个性化建议：
- **错误模式分析**：分析学生常见的英语错误类型（语法、词汇、连贯性）
- **学习路径推荐**：推荐适合学生当前英语水平的练习重点
- **进步跟踪**：显示英语写作能力的进步轨迹，特别是高考相关技能的提升

### 英语写作任务类型

#### 应用文 (Practical Writing)
- **书信**：正式/非正式信件，注意格式和语气
- **邮件**：电子邮件的格式和表达
- **通知**：公告类文体，要求简洁明了
- **演讲稿**：口语化表达，注意开头和结尾
- **申请信**：正式文体，突出个人优势

#### 读后续写 (Story Continuation)
- **记叙文续写**：延续故事发展，保持风格一致
- **故事结尾续写**：合理结局，注意与前文呼应
- **情景对话续写**：符合人物性格，对话自然
- **关键要求**：情节合理、人物连贯、语言风格一致

</context>

---

## 实体属性示例

### 学生实体示例（中国高中生）
```json
{
  "student_id": "G202501001",
  "name": "张三",
  "grade": "高中二年级",
  "english_level": "B1（中级）",
  "common_error_types": ["时态错误", "冠词缺失", "中式英语"],
  "preferred_polish_types": ["语法润色", "词汇润色"],
  "api_usage_count": 15,
  "total_english_essays": 8,
  "target_exam": "高考"
}
```

### 英语作文实体示例（应用文）
```json
{
  "essay_id": "20251207-EN-PW-001",
  "student_id": "G202501001",
  "title": "A Letter to My Pen Pal",
  "type": "practical_writing",
  "subtype": "letter",
  "content": "Dear Tom, I am very happy to receive your letter...",
  "word_count": 120,
  "task_requirements": ["自我介绍", "询问对方爱好", "邀请来访"],
  "submission_time": "2025-12-07T10:30:00Z",
  "status": "draft",
  "language": "english"
}
```

### 英语作文实体示例（读后续写）
```json
{
  "essay_id": "20251207-EN-SC-001",
  "student_id": "G202501001",
  "title": "The Lost Key - Continuation",
  "type": "story_continuation",
  "subtype": "story_ending",
  "original_story": "John was walking home when he found a shiny key on the ground...",
  "continuation_content": "He decided to take the key to the police station...",
  "word_count": 150,
  "continuation_requirements": ["合理结局", "保持人物性格", "80-100词"],
  "submission_time": "2025-12-07T11:30:00Z",
  "status": "draft",
  "language": "english"
}
```

### 润色实体示例（英语语法润色）
```json
{
  "polish_id": "20251207-EN-001-p1",
  "essay_id": "20251207-EN-PW-001",
  "type": "grammar_polish",
  "original_content": "I am very happy to receive your letter. I want tell you about my family.",
  "polished_content": "I am very happy to have received your letter. I want to tell you about my family.",
  "changes": [
    {"position": 15, "original": "receive", "suggested": "have received", "reason": "时态建议：使用现在完成时表示对收到信的高兴持续到现在"},
    {"position": 35, "original": "want tell", "suggested": "want to tell", "reason": "语法错误：want后需要加to不定式"}
  ],
  "polish_time": "2025-12-07T10:35:00Z",
  "error_types_fixed": ["时态错误", "不定式错误"]
}
```

---

## 注意事项

1. **实体完整性**：学生、作文、润色、反馈是核心实体，必须明确定义
2. **关系明确性**：学生与作文是一对多，作文与润色是一对多
3. **分类清晰**：学生按年级分类，作文按文体分类，润色按类型分类
4. **唯一标识**：每个实体都有明确的编码规则
5. **上下文丰富**：提供足够的背景信息帮助AI理解写作教学场景