# cli-zy

🚀 **Zhiyuan Zhang's CLI** - Mac 开发环境配置工具

## ✨ 特性

- 🎯 **一键配置** - 自动配置 Mac 前端开发环境
- 🔧 **开发工具** - 安装 Homebrew、Git、nvm、fzf、iTerm2、Oh My Posh 等开发工具
- 📋 **Git 别名** - 自动配置 Git 快捷命令别名
- 🎨 **美化终端** - 配置美观的命令行提示符和增强终端
- 🛡️ **智能检测** - 自动识别已安装的工具，避免重复安装

## 📋 前置条件

安装 Node.js 环境：

```bash
# 访问 https://nodejs.org/ 下载并安装 LTS 版本
# 或使用命令行安装
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
nvm install --lts
nvm use --lts
```

## 📦 安装 cli-zy

```bash
npm install -g cli-zy
```

## 🚀 快速开始

```bash
# 1. 安装 cli-zy
npm install -g cli-zy

# 2. 配置开发环境
cli-zy setup

# 3. clone 仓库
cli-zy clone username/repo
```

### 自动安装的工具

- Homebrew - macOS 包管理器
- Git - 版本控制工具
- nvm - Node.js 版本管理器
- fzf - 模糊查找工具
- iTerm2 - 增强终端
- Oh My Posh - 终端美化

### node 版本的 lki clone

- 支持多种 Git URL 格式
- 自动创建 `~/code/src` 目录结构
- 按域名组织项目（如 `~/code/src/github.com/username/repo`）
- 自动检测 SSH 密钥，选择合适的协议

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

## 🚀 lki clone

### 支持的 URL 格式

```bash
# 完整 URL
cli-zy clone git@github.com:username/repo.git
cli-zy clone https://github.com/username/repo.git

# 简写格式（自动推断为 GitHub）
cli-zy clone username/repo

# 其他 Git 服务
cli-zy clone gitlab.com/username/repo
```

### 目录结构

克隆的仓库会自动组织到以下目录结构：
```
~/code/src/
├── github.com/
│   ├── username/
│   │   └── repo/
│   └── another-user/
│       └── another-repo/
└── gitlab.com/
    └── username/
        └── repo/
```

## 🔧 命令

```bash
cli-zy setup     # 配置开发环境
cli-zy clone     # clone 仓库
cli-zy help      # 显示帮助
```

## 🛠️ 开发

```bash
git clone https://github.com/zzhiyuan98/cli-zy.git
cd cli-zy
npm install -g .  # 本地安装测试
```



## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

**要求：** Node.js 18+, npm 9+, macOS

## 📄 许可证

ISC License
