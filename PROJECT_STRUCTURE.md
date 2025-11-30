# 项目结构说明

## 📁 目录结构

```
AIPD_test/
├── GobangGame.html          # 主游戏文件 - 包含完整游戏逻辑
├── README.md               # 项目说明文档
├── PROJECT_STRUCTURE.md    # 项目结构说明 (本文件)
├── package.json            # 项目配置文件
├── .gitignore              # Git忽略规则
├── LICENSE                 # MIT开源许可证
└── demo/                   # 演示文件目录 (可选)
    ├── gomoku.html         # 演示文件
    ├── game.js             # 游戏逻辑
    ├── styles.css          # 样式文件
    ├── audio.js            # 音频处理
    └── README.md           # 演示说明
```

## 🔧 文件说明

### 核心文件

#### `GobangGame.html`
- **类型**: 主游戏文件
- **描述**: 包含完整的五子棋游戏实现
- **特点**:
  - 单文件设计，无需额外依赖
  - 包含HTML结构、CSS样式和JavaScript逻辑
  - 支持人机对战和双人对战模式

#### `README.md`
- **类型**: 项目文档
- **描述**: 详细的项目说明和使用指南
- **内容**:
  - 项目介绍和特色
  - 快速开始指南
  - 游戏规则说明
  - 技术栈介绍
  - AI算法说明

#### `package.json`
- **类型**: 项目配置文件
- **描述**: 定义项目元数据和依赖
- **用途**:
  - 项目基本信息 (名称、版本、描述)
  - 开发脚本命令
  - 关键词和许可证信息
  - 可选开发依赖

#### `.gitignore`
- **类型**: Git忽略文件
- **描述**: 定义不需要版本控制的文件和目录
- **忽略内容**:
  - 依赖目录 (node_modules)
  - 系统文件 (.DS_Store)
  - 日志文件
  - IDE配置文件
  - 临时文件

#### `LICENSE`
- **类型**: 开源许可证
- **描述**: MIT开源许可证文本
- **权限**: 允许自由使用、修改和分发

#### `PROJECT_STRUCTURE.md`
- **类型**: 项目结构文档 (本文件)
- **描述**: 详细的项目文件结构说明

### 代码结构 (GobangGame.html)

#### HTML结构
```html
- 头部: 元数据和样式定义
- 主体: 
  - 卡片容器 (.card)
  - 头部区域 (.header): 模式切换和标题
  - 状态栏 (.status-bar): 玩家状态指示
  - 棋盘区域 (.board-wrapper): 游戏棋盘
  - 控制区域 (.controls): 消息和按钮
```

#### CSS样式
- **设计理念**: 现代化卡片式设计
- **布局**: CSS Grid + Flexbox
- **特性**:
  - 响应式设计
  - 毛玻璃效果
  - 平滑动画
  - 自定义变量

#### JavaScript逻辑
- **主类**: `GobangGame`
- **核心方法**:
  - `initBoard()`: 初始化棋盘
  - `handleMove()`: 处理落子
  - `checkWin()`: 检查胜利条件
  - `aiMove()`: AI决策算法
  - `evaluatePoint()`: 位置评分

## 🎮 游戏架构

### 数据模型
```javascript
boardData: 15×15二维数组，存储棋盘状态
currentPlayer: 当前玩家 ('black' | 'white')
winner: 胜利者 (null | 'black' | 'white')
isPvE: 游戏模式 (true: 人机对战, false: 双人对战)
```

### 事件处理
- **棋盘点击**: 处理玩家落子
- **模式切换**: 切换游戏模式
- **重新开始**: 重置游戏状态

### AI算法
- **评分系统**: 基于连子数量和位置评分
- **策略**: 进攻与防守平衡
- **随机性**: 同等评分位置随机选择

## 🔄 开发流程

### 本地开发
1. 直接编辑 `GobangGame.html` 文件
2. 在浏览器中打开文件测试
3. 使用开发服务器 (可选): `npm run serve`

### 自定义修改
- **修改AI难度**: 调整评分权重
- **更改棋盘大小**: 修改 `BOARD_SIZE` 常量
- **自定义样式**: 编辑CSS变量

## 📊 技术规格

### 浏览器支持
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

### 性能考虑
- 轻量级实现，无外部依赖
- 优化的胜利检测算法
- 响应式设计，适配移动设备

## 🚀 部署

### 静态部署
直接将所有文件上传到Web服务器即可。

### GitHub Pages
1. 推送到GitHub仓库: `https://github.com/yanlinson/AIPD_test`
2. 在仓库设置中启用GitHub Pages
3. 选择主分支作为发布源

### 其他平台
- Netlify
- Vercel
- 任何静态文件托管服务