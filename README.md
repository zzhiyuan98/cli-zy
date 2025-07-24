# cli-zy

🚀 **Zhiyuan Zhang's CLI** - Mac 开发环境配置工具

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

## 📦 安装

```bash
npm install -g cli-zy
```

## 🚀 快速开始

```bash
# 1. 安装 cli-zy
npm install -g cli-zy

# 2. 配置开发环境
cli-zy setup

# 3. 克隆仓库
cli-zy clone username/repo

# 4. 快速切换工作区
ws
```

## 🔧 功能

### 自动安装的工具

- **Homebrew** - macOS 包管理器
- **Git** - 版本控制工具
- **nvm** - Node.js 版本管理器
- **fzf** - 模糊查找工具
- **iTerm2** - 增强终端
- **Oh My Posh** - 终端美化

### Git 别名配置

工具包会自动配置以下 Git 快捷命令：

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

### 工作区管理

#### `cli-zy clone` - 智能克隆

支持多种 Git URL 格式，自动创建规范的目录结构：

```bash
# 完整 URL
cli-zy clone git@github.com:username/repo.git
cli-zy clone https://github.com/username/repo.git

# 简写格式（自动推断为 GitHub）
cli-zy clone username/repo

# 其他 Git 服务
cli-zy clone gitlab.com/username/repo
```

**目录结构：**
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

#### `ws` - 快速切换工作区

在 `~/code/src` 目录下搜索所有 Git 仓库，使用模糊查找器交互式选择：

```bash
ws
```

**使用场景：**
- 快速在多个项目间切换
- 不需要记住具体的项目路径
- 配合 `cli-zy clone` 使用，克隆后可以立即用 `ws` 切换

## 📋 命令

```bash
cli-zy setup     # 配置开发环境
cli-zy clone     # 克隆仓库
cli-zy help      # 显示帮助
ws               # 快速切换工作区（配置后可用）
```

## 🛠️ 开发

```bash
git clone https://github.com/zzhiyuan98/cli-zy.git
cd cli-zy
npm install -g .  # 本地安装测试
```

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

ISC License
