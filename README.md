# cli-zy

🚀 **Zhiyuan Zhang's CLI** - 一个简单易用的 Git 快捷命令工具

## ✨ 特性

- 🎯 **一键设置** - 自动配置 Git 快捷命令别名
- 🔧 **智能检测** - 自动识别 zsh/bash 环境
- 📋 **丰富命令** - 包含常用的 Git 操作
- 🛡️ **安全可靠** - 避免重复设置，保护现有配置

## 📦 安装

```bash
# 全局安装
npm install -g cli-zy

# 或者从本地安装
npm install -g .
```

## 🚀 快速开始

### 1. 设置别名

```bash
cli-zy setup
```

这个命令会自动：
- 检测你的 shell 环境 (zsh/bash)
- 在对应的配置文件中添加 Git 别名
- 显示设置结果和可用命令

### 2. 重新加载配置

```bash
# 重新加载 shell 配置
source ~/.zshrc  # 或 source ~/.bashrc

# 或者直接重新打开终端
```

### 3. 开始使用

```bash
# 查看差异
gd

# 创建并切换到新分支
gcb feature/new-feature

# 切换分支
gco main

# 提交所有更改并签名
gca "feat: 添加新功能"

# 推送到远程分支
gpd

# 拉取并 rebase
pull

# 交互式 rebase
grbi HEAD~3

# 硬重置
grh

# 删除分支（交互式选择）
gdbr

# cherry-pick
gcp <commit-hash>

# 复制当前提交 ID
id

# 撤销上次提交
undo
```

## 📋 可用命令

| 别名 | 命令 | 说明 |
|------|------|------|
| `gd` | `git diff` | 查看差异 |
| `gcb` | `git checkout -b` | 创建并切换到新分支 |
| `gco` | `git checkout` | 切换分支 |
| `gca` | `git commit --all -S` | 提交所有更改并签名 |
| `gpd` | `git push o HEAD` | 推送到远程分支 |
| `pull` | `git pull ==rebase` | 拉取并 rebase |
| `grbi` | `git rebase -i` | 交互式 rebase |
| `grh` | `git reset --hard` | 硬重置 |
| `gdbr` | `git branch --list \| grep -Ev '^\* ' \| fzf -m \| xargs -I {} git branch -D {}` | 删除分支（交互式选择） |
| `gcp` | `git cherry-pick` | 遴选 |
| `id` | `git rev-parse --short HEAD \| xargs echo -n \| pbcopy` | 复制当前提交 ID |
| `undo` | `git reset --soft HEAD~` | 撤销上次提交 |

## 🔧 CLI 命令

```bash
cli-zy setup     # 设置 Git 快捷命令别名
cli-zy list      # 列出所有可用的快捷命令
cli-zy help      # 显示帮助信息
```

## 📝 示例

```bash
# 设置别名
$ cli-zy setup
🚀 正在设置 Git 快捷命令别名...
📁 配置文件: /Users/username/.zshrc
✅ 别名设置完成！
🔄 请运行以下命令重新加载配置：
   source ~/.zshrc

📋 可用的快捷命令：
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

# 查看命令列表
$ cli-zy list
📋 Git 快捷命令列表：
┌─────┬─────────────────────────────────┐
│ 别名 │ 命令                            │
├─────┼─────────────────────────────────┤
│ gd  │ git diff                        │
│ gcb │ git checkout -b                 │
│ gco │ git checkout                    │
│ gca │ git commit --all -S             │
│ gpd │ git push o HEAD                 │
│ pull│ git pull --rebase               │
│ grbi│ git rebase -i                   │
│ grh │ git reset --hard                │
│ gdbr│ git branch --list | grep -Ev... │
│ gcp │ git cherry-pick                 │
│ id  │ git rev-parse --short HEAD...   │
│ undo│ git reset --soft HEAD~          │
└─────┴─────────────────────────────────┘
```

## 🔄 重新设置

如果需要重新设置别名，请先手动删除 shell 配置文件中的别名配置，然后重新运行 `cli-zy setup`。

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

ISC License
