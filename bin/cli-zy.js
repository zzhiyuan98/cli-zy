#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');

// 获取命令行参数
const args = process.argv.slice(2);
const command = args[0];

// Git 别名配置
const gitAliases = {
  'gd': 'git diff',
  'gcb': 'git checkout -b',
  'gco': 'git checkout',
  'gca': 'git commit --all -S',
  'gpd': 'git push o HEAD',
  'pull': 'git pull --rebase',
  'grbi':  'git rebase -i',
  'grh': 'git reset --hard',
  'gdbr': 'git branch --list | grep -Ev \'^\* \' | fzf -m | xargs -I {} git branch -D {}',
  'gcp': 'git cherry-pick',
  'id': 'git rev-parse --short HEAD | xargs echo -n | pbcopy',
  'undo': 'git reset --soft HEAD~',
};

// 获取 shell 配置文件路径
function getShellConfigPath() {
  const homeDir = os.homedir();
  const shell = process.env.SHELL || '';
  return path.join(homeDir, shell.includes('bash') ? '.bashrc' : '.zshrc');
}

// 检查别名是否已存在
function aliasesExist(configPath) {
  if (!fs.existsSync(configPath)) {
    return false;
  }
  
  const content = fs.readFileSync(configPath, 'utf8');
  return content.includes('alias gca=');
}

// 设置别名
function setupAliases() {
  const configPath = getShellConfigPath();
  const shellName = path.basename(configPath);
  
  console.log(`🚀 正在设置 Git 快捷命令别名...`);
  console.log(`📁 配置文件: ${configPath}`);
  
  // 检查是否已存在
  if (aliasesExist(configPath)) {
    console.log(`⚠️  别名已存在，跳过设置...`);
    console.log(`💡 如需重新设置，请先手动删除 ${shellName} 中的别名配置`);
    return;
  }
  
  // 确保配置文件存在
  if (!fs.existsSync(configPath)) {
    console.log(`📝 创建 ${shellName} 文件...`);
    fs.writeFileSync(configPath, '');
  }
  
  // 生成别名配置
  let aliasConfig = '\n# Git 快捷命令别名 (由 cli-zy 自动生成)\n';
  Object.entries(gitAliases).forEach(([alias, command]) => {
    aliasConfig += `alias ${alias}='${command}'\n`;
  });
  aliasConfig += '# 结束 cli-zy 别名配置\n';
  
  // 写入配置文件
  fs.appendFileSync(configPath, aliasConfig);
  
  console.log(`✅ 别名设置完成！`);
  console.log(`🔄 请运行以下命令重新加载配置：`);
  console.log(`   source ${configPath}`);
  console.log(`   # 或者重新打开终端`);
  
  showAvailableCommands();
}

// 显示可用命令
function showAvailableCommands() {
  console.log(`\n📋 可用的快捷命令：`);
  Object.entries(gitAliases).forEach(([alias, command]) => {
    console.log(`   ${alias.padEnd(4)} - ${command}`);
  });
}

// 显示帮助信息
function showHelp() {
  console.log(`
🔧 cli-zy - Git 快捷命令工具

使用方法:
  cli-zy setup    设置 Git 快捷命令别名
  cli-zy help     显示帮助信息
  cli-zy list     列出所有可用的快捷命令

示例:
  cli-zy setup     # 设置别名到 shell 配置文件
  gca "提交信息"    # 提交所有更改并签名
  gcb feature/new  # 创建并切换到新分支
  gco main         # 切换到主分支
  gd               # 查看差异

更多信息请访问: https://github.com/zzhiyuan98/cli-zy
`);
}

// 列出命令
function listCommands() {
  console.log(`\n📋 Git 快捷命令列表：`);
  console.log(`┌─────┬─────────────────────────────────┐`);
  console.log(`│ 别名 │ 命令                            │`);
  console.log(`├─────┼─────────────────────────────────┤`);
  
  Object.entries(gitAliases).forEach(([alias, command]) => {
    console.log(`│ ${alias.padEnd(3)} │ ${command.padEnd(31)} │`);
  });
  
  console.log(`└─────┴─────────────────────────────────┘`);
}

// 主函数
function main() {
  switch (command) {
    case 'setup':
      setupAliases();
      return;
    case 'list':
      listCommands();
      return;
    case 'help':
    case '--help':
    case '-h':
      showHelp();
      return;
    default:
      if (command) {
        console.log(`❌ 未知命令: ${command}`);
        console.log(`💡 运行 'cli-zy help' 查看可用命令`);
        return;
      }
      showHelp();
  }
}

// 运行主函数
main(); 
