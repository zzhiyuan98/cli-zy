# cli-zy

Zhiyuan Zhang's CLI 工具包，提供常用的 Git 命令快捷方式。

## 安装

全局安装：

```bash
npm install -g .
```

或者从 npm 仓库安装（如果已发布）：

```bash
npm install -g cli-zy
```

## 使用方法

安装后，你可以直接使用以下命令：

### gca - Git Commit All (签名提交)
```bash
gca [提交信息]
```
等同于：`git commit -all -S`

### gcb - Git Checkout Branch (创建并切换到新分支)
```bash
gcb [分支名]
```
等同于：`git checkout -b`

### gco - Git Checkout (切换分支)
```bash
gco [分支名]
```
等同于：`git checkout`

### gd - Git Diff (查看差异)
```bash
gd [参数]
```
等同于：`git diff`

## 示例

```bash
# 提交所有更改并签名
gca "feat: 添加新功能"

# 创建并切换到新分支
gcb feature/new-feature

# 切换到主分支
gco main

# 查看工作区差异
gd

# 查看暂存区差异
gd --cached
```
