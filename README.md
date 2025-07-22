# cli-zy

🚀 **Zhiyuan Zhang's CLI** - Mac 开发环境配置工具

## ✨ 特性

- 🎯 **一键配置** - 自动配置 Mac 前端开发环境
- 🔧 **开发工具** - 安装 Homebrew、Git、nvm 等开发工具
- 📋 **Git 别名** - 自动配置 Git 快捷命令别名
- 🛡️ **智能检测** - 自动识别已安装的工具，避免重复安装

## 📦 安装

```bash
# 全局安装
npm install -g cli-zy

# 或者从本地安装
npm install -g .
```

## 🚀 快速开始

### 一键配置 Mac 开发环境

```bash
cli-zy setup
```

这个命令会自动完成以下配置：

1. **安装 Homebrew** - macOS 包管理器
2. **安装 Git** - 版本控制工具
3. **安装 nvm** - Node.js 版本管理器
4. **配置 Git 别名** - 自动设置快捷命令
5. **重新加载配置** - 使配置立即生效

### 配置内容

#### Homebrew 安装
- 自动下载并安装 Homebrew
- 配置 PATH 环境变量
- 支持 Intel 和 Apple Silicon Mac

#### Git 安装
- 优先使用 Homebrew 安装
- 如果 Homebrew 不可用，引导用户去官网下载

#### nvm 安装
- 安装 nvm Node.js 版本管理器
- 提供 nvm 基本用法指导
- 不强制安装特定 Node.js 版本

#### Git 别名配置
自动配置以下 Git 快捷命令：

| 别名 | 命令 | 说明 |
|------|------|------|
| `gd` | `git diff` | 查看差异 |
| `gcb` | `git checkout -b` | 创建并切换到新分支 |
| `gco` | `git checkout` | 切换分支 |
| `gca` | `git commit --all -S` | 提交所有更改并签名 |
| `gpd` | `git push o HEAD` | 推送到远程分支 |
| `pull` | `git pull --rebase` | 拉取并 rebase |
| `grbi` | `git rebase -i` | 交互式 rebase |
| `grh` | `git reset --hard` | 硬重置 |
| `gdbr` | `git branch --list \| grep -Ev '^\* ' \| fzf -m \| xargs -I {} git branch -D {}` | 删除分支（交互式选择） |
| `gcp` | `git cherry-pick` | 遴选 |
| `id` | `git rev-parse --short HEAD \| xargs echo -n \| pbcopy` | 复制当前提交 ID |
| `undo` | `git reset --soft HEAD~` | 撤销上次提交 |

## 🔧 CLI 命令

```bash
cli-zy setup     # 配置 Mac 开发环境
cli-zy help      # 显示帮助信息
```

## 📝 使用示例

```bash
# 配置开发环境
$ cli-zy setup
🚀 开始配置 Mac 前端开发环境...

1️⃣ 检查 Homebrew
✅ Homebrew 已安装

2️⃣ 安装 Git 并配置别名
✅ Git 已安装
2️⃣ 配置 Git 快捷命令别名
📁 配置文件: /Users/username/.zshrc
✅ Git 别名配置完成

📋 可用的 Git 快捷命令：
   gd    - git diff
   gcb   - git checkout -b
   gco   - git checkout
   gca   - git commit --all -S
   gpd   - git push o HEAD
   pull  - git pull --rebase
   grbi  - git rebase -i
   grh   - git reset --hard
   gdbr  - git branch --list | grep -Ev '^\* ' | fzf -m | xargs -I {} git branch -D {}
   gcp   - git cherry-pick
   id    - git rev-parse --short HEAD | xargs echo -n | pbcopy
   undo  - git reset --soft HEAD~

3️⃣ 安装 nvm
✅ nvm 已安装
✅ nvm 安装完成

📋 nvm 基本用法：
• 安装最新 LTS 版本: nvm install --lts
• 安装指定版本: nvm install 18.17.0
• 切换版本: nvm use 18.17.0
• 设置默认版本: nvm alias default 18.17.0
• 查看已安装版本: nvm list

4️⃣ 重新加载 Shell 配置
✅ Shell 配置已重新加载

🎉 Mac 开发环境配置完成！

📋 下一步：
1. 根据项目需求安装合适的 Node.js 版本
2. 验证安装: git --version

# 使用 Git 快捷命令
$ gca "feat: 添加新功能"
$ gcb feature/new-feature
$ gco main
$ gd
```

## 🛠️ 开发

```bash
# 安装依赖
npm install

# 发布新版本
npm run release
```

## 📁 项目结构

```
cli-zy/
├── bin/
│   └── cli-zy.js          # CLI 入口点
├── scripts/
│   ├── setup-mac.js       # Mac 开发环境配置脚本
│   └── utils.js           # 工具函数模块
├── package.json
└── README.md
```

## 🔄 重新配置

如果需要重新配置 Git 别名，请先手动删除 shell 配置文件中的别名配置，然后重新运行 `cli-zy setup`。

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## �� 许可证

ISC License
