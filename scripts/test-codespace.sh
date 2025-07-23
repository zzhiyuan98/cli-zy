#!/bin/bash

# GitHub Codespaces 测试脚本
set -e

echo "🚀 开始 GitHub Codespaces 测试..."

# 检查环境
echo "🔍 检查环境信息："
echo "   OS: $(uname -s)"
echo "   Node.js: $(node --version 2>/dev/null || echo '未安装')"
echo "   npm: $(npm --version 2>/dev/null || echo '未安装')"

# 安装 Node.js（如果需要）
if ! command -v node >/dev/null 2>&1; then
    echo "📥 安装 Node.js..."
    # 在 Ubuntu 环境中使用 apt 安装
    curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
    sudo apt-get install -y nodejs
fi

# 安装 cli-zy
npm install -g /workspace

# 运行测试
echo "🚀 运行 cli-zy setup..."
cli-zy setup

echo "✅ 测试完成！" 
