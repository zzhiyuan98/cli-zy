#!/usr/bin/env node

const path = require('path');

// 获取命令行参数
const args = process.argv.slice(2);
const command = args[0];

// 显示帮助信息
function showHelp() {
  console.log(`
🔧 cli-zy - Mac 开发环境配置工具

使用方法:
  cli-zy setup    配置 Mac 开发环境（安装 Homebrew、Git、nvm 并配置 Git 别名）
  cli-zy clone    智能克隆 Git 仓库到工作区
  cli-zy help     显示帮助信息

功能说明:
  • 自动安装 Homebrew 包管理器
  • 安装 Git 版本控制工具
  • 安装 nvm Node.js 版本管理器
  • 配置 Git 快捷命令别名
  • 智能克隆 Git 仓库到 ~/code/src 目录结构
  • 自动重新加载 shell 配置

示例:
  cli-zy setup     # 一键配置 Mac 开发环境
  cli-zy clone     # 智能克隆仓库
  cli-zy help      # 查看帮助信息
`);
}

// 主函数
function main() {
  switch (command) {
    case 'setup':
      // 运行 Mac 开发环境配置脚本
      const setupScript = path.join(__dirname, '../scripts/setup-mac.js');
      require(setupScript);
      return;
    case 'clone':
      // 运行 Git 仓库克隆脚本
      const cloneScript = path.join(__dirname, '../scripts/clone.js');
      require(cloneScript);
      return;
    case 'help':
    case '--help':
    case '-h':
      showHelp();
      return;
    default:
      console.log('🔧 cli-zy - Mac 开发环境配置工具');
      console.log('使用 cli-zy help 查看帮助信息');
  }
}

// 运行主函数
main(); 
