# cli-zy

🚀 **Zhiyuan Zhang's CLI** - Mac 开发环境配置工具

## ✨ 特性

- 🎯 **一键配置** - 自动配置 Mac 前端开发环境
- 🔧 **开发工具** - 安装 Homebrew、Git、nvm、fzf 等开发工具
- 📋 **Git 别名** - 自动配置 Git 快捷命令别名
- 🛡️ **智能检测** - 自动识别已安装的工具，避免重复安装

## 📦 安装

```bash
npm install -g cli-zy
```

## 🚀 快速开始

```bash
# 一键配置 Mac 开发环境
cli-zy setup
```

### 配置内容

- **Homebrew** - macOS 包管理器
- **Git** - 版本控制工具
- **nvm** - Node.js 版本管理器
- **fzf** - 模糊查找工具（用于交互式分支选择）
- **Git 别名** - 自动设置快捷命令

## 📋 Git 快捷命令

| 别名 | 命令 | 说明 |
|------|------|------|
| `gca` | `git commit --all -S` | 提交所有更改并签名 |
| `gcb` | `git checkout -b` | 创建并切换到新分支 |
| `gco` | `git checkout` | 切换分支 |
| `gd` | `git diff` | 查看差异 |
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

## 🛠️ 开发

```bash
npm install      # 安装依赖
npm run release  # 发布新版本
```

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

ISC License
