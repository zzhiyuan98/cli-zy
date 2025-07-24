#!/usr/bin/env node

const path = require('path');

const args = process.argv.slice(2);
const command = args[0];

function showHelp() {
  console.log(`
🔧 cli-zy - Mac 开发环境配置工具

使用方法:
  cli-zy setup    配置 Mac 开发环境
  cli-zy clone    智能克隆 Git 仓库
`);
}

function main() {
  switch (command) {
    case 'setup':
      const setupScript = path.join(__dirname, '../scripts/setup-mac.js');
      require(setupScript);
      return;
    case 'clone':
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

main(); 
