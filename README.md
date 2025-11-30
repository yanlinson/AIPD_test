# 五子棋游戏 (Gobang Game)

一个基于纯HTML/CSS/JavaScript实现的五子棋游戏，支持人机对战和双人对战模式。

## 🎮 游戏特色

- **双模式切换**：人机对战 vs 双人对战
- **智能AI**：具备进攻和防守策略的AI对手
- **精美界面**：现代化UI设计，包含动画效果
- **响应式设计**：适配不同屏幕尺寸
- **胜利检测**：自动检测五子连珠并高亮显示

## 🚀 快速开始

### 在线体验
直接打开 `GobangGame.html` 文件即可在浏览器中运行游戏。

### 本地运行
```bash
# 克隆项目
git clone https://github.com/yanlinson/AIPD_test.git

# 进入项目目录
cd AIPD_test

# 打开游戏
open GobangGame.html
# 或者直接在浏览器中打开文件
```

## 🎯 游戏规则

- 棋盘：15×15标准棋盘
- 先手：黑方先行
- 胜利条件：任意方向连成五子
- 模式：
  - **人机对战**：玩家(黑) vs AI(白)
  - **双人对战**：两位玩家轮流落子

## 🛠️ 技术栈

- **前端**：HTML5, CSS3, JavaScript (ES6+)
- **无依赖**：纯原生实现，无需任何框架
- **响应式**：CSS Grid + Flexbox 布局

## 📁 项目结构

```
gobang-game/
├── GobangGame.html          # 主游戏文件
├── README.md               # 项目说明文档
├── package.json            # 项目配置
├── .gitignore              # Git忽略文件
└── LICENSE                 # 开源许可证
```

## 🎮 游戏功能

### 核心功能
- [x] 15×15标准棋盘
- [x] 人机对战模式
- [x] 双人对战模式
- [x] 智能AI算法
- [x] 胜利条件检测
- [x] 连子高亮显示
- [x] 游戏状态管理

### UI特性
- [x] 模式切换开关
- [x] 玩家状态指示器
- [x] 落子动画效果
- [x] 响应式布局
- [x] 现代化卡片设计

## 🤖 AI算法

AI采用基于评分系统的决策算法：

- **进攻策略**：优先形成连子
- **防守策略**：阻挡对手形成连子
- **位置评分**：中心位置获得更高权重
- **随机选择**：同等评分位置随机选择

### 评分权重
- 五子连珠：100000分
- 阻挡对手胜利：50000分
- 活四：10000分
- 阻挡活四：8000分
- 活三：1000分
- 阻挡活三：800分
- 中心位置：10分/格

## 🎨 界面预览

游戏界面采用现代化设计：
- 卡片式布局
- 毛玻璃效果
- 平滑过渡动画
- 状态指示器
- 思考状态提示

## 📱 浏览器兼容性

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 🛠️ 开发

### 本地开发
由于项目使用纯前端技术，无需构建过程，直接编辑HTML文件即可。

### 自定义修改
- **修改AI难度**：调整 `aiMove()` 方法中的评分权重
- **更改棋盘大小**：修改 `BOARD_SIZE` 常量
- **自定义样式**：编辑CSS变量和样式规则

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

1. Fork 本项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 📞 联系

如有问题或建议，请通过以下方式联系：
- 提交 [Issue](https://github.com/yanlinson/AIPD_test/issues)
- 访问 [GitHub 仓库](https://github.com/yanlinson/AIPD_test)

---

⭐ 如果这个项目对你有帮助，请给它一个星标！