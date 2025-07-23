#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');
const { log, logStep, logSuccess, logWarning, logError, commandExists, runCommand, getShellConfigPath } = require('./utils');

// 全局变量
const configPath = getShellConfigPath();
const shellName = path.basename(configPath);

// 检查并安装 Homebrew
function installHomebrew() {
  logStep('1️⃣', '检查 Homebrew');
  
  if (commandExists('brew')) {
    logSuccess('Homebrew 已安装');
    return;
  }
  
  logWarning('Homebrew 未安装，正在自动安装...');
  logWarning('安装过程可能需要输入管理员密码');
  const installCommand = '/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"';
  
  try {
    execSync(installCommand, { stdio: 'inherit' });
    logSuccess('Homebrew 安装完成');
  } catch (error) {
    logError(`Homebrew 安装失败: ${error.message}`);
    logWarning('请手动安装 Homebrew:');
    logWarning('/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"');
    return;
  }
  
  // 添加 Homebrew 路径到配置文件
  const brewPath = os.arch() === 'arm64' 
    ? 'export PATH="/opt/homebrew/bin:$PATH"'
    : 'export PATH="/usr/local/bin:$PATH"';
  
  if (!fs.readFileSync(configPath, 'utf8').includes(brewPath)) {
    fs.appendFileSync(configPath, `\n# Homebrew\n${brewPath}\n`);
    logSuccess('Homebrew 路径已添加到配置文件');
  }
}

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
  'gdbr': 'git branch --list | grep -Ev "^\\* " | fzf -m | xargs -I {} git branch -D {}',
  'gcp': 'git cherry-pick',
  'id': 'git rev-parse --short HEAD | xargs echo -n | pbcopy',
  'undo': 'git reset --soft HEAD~',
};

// 检查别名是否已存在
function aliasesExist(configPath) {
  if (!fs.existsSync(configPath)) {
    return false;
  }
  
  const content = fs.readFileSync(configPath, 'utf8');
  return content.includes('alias gca=');
}

// 安装 Git 并配置别名
function installGit() {
  logStep('2️⃣', '安装 Git 并配置别名');
  
  // 安装 Git
  if (!commandExists('git')) {
    if (!commandExists('brew')) {
      logWarning('Homebrew 未安装，无法自动安装 Git');
      logWarning('请从 Git 官网下载安装：https://git-scm.com/download/mac');
      return;
    }
    
    runCommand('brew install git', '使用 Homebrew 安装 Git');
  } else {
    logSuccess('Git 已安装');
  }
  
  // 配置 Git 别名
  logStep('2️⃣', '配置 Git 快捷命令别名');
  log(`📁 配置文件: ${configPath}`);
  
  // 检查是否已存在
  if (aliasesExist(configPath)) {
    logWarning('Git 别名已存在，跳过设置');
    logWarning(`如需重新设置，请先手动删除 ${shellName} 中的别名配置`);
    return;
  }
  
  // 确保配置文件存在
  if (!fs.existsSync(configPath)) {
    log(`📝 创建 ${shellName} 文件...`);
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
  logSuccess('Git 别名配置完成');
  
  // 显示可用命令
  log('\n📋 可用的 Git 快捷命令：', 'cyan');
  Object.entries(gitAliases).forEach(([alias, command]) => {
    log(`   ${alias.padEnd(4)} - ${command}`);
  });
}

// 安装 nvm
function installNvm() {
  logStep('3️⃣', '安装 nvm');
  
  if (commandExists('nvm')) {
    logSuccess('nvm 已安装');
    return;
  }
  
  // 安装 nvm
  const nvmInstallScript = 'curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash';
  runCommand(nvmInstallScript, '安装 nvm');
  
  // 配置 nvm 环境变量
  const nvmConfig = '\n# nvm 配置\nexport NVM_DIR="$HOME/.nvm"\n[ -s "$NVM_DIR/nvm.sh" ] && \\. "$NVM_DIR/nvm.sh"\n[ -s "$NVM_DIR/bash_completion" ] && \\. "$NVM_DIR/bash_completion"\n';
  
  if (!fs.readFileSync(configPath, 'utf8').includes('export NVM_DIR')) {
    fs.appendFileSync(configPath, nvmConfig);
    logSuccess('nvm 环境变量已配置');
  }
  
  logSuccess('nvm 安装完成');
  log('\n📋 nvm 基本用法：', 'cyan');
  log('• 安装最新 LTS 版本: nvm install --lts');
  log('• 安装指定版本: nvm install 18.17.0');
  log('• 切换版本: nvm use 18.17.0');
  log('• 设置默认版本: nvm alias default 18.17.0');
  log('• 查看已安装版本: nvm list');
}

// 安装 fzf
function installFzf() {
  logStep('4️⃣', '安装 fzf');
  
  if (commandExists('fzf')) {
    logSuccess('fzf 已安装');
    return;
  }
  
  if (!commandExists('brew')) {
    logWarning('Homebrew 未安装，无法自动安装 fzf');
    logWarning('请手动安装 fzf: https://github.com/junegunn/fzf#installation');
    return;
  }
  
  runCommand('brew install fzf', '使用 Homebrew 安装 fzf');
}

// 安装 iTerm2
function installITerm2() {
  logStep('5️⃣', '安装 iTerm2');
  
  if (commandExists('iterm2')) {
    logSuccess('iTerm2 已安装');
    return;
  }
  
  if (!commandExists('brew')) {
    logWarning('Homebrew 未安装，无法自动安装 iTerm2');
    logWarning('请手动安装 iTerm2: https://iterm2.com/downloads.html');
    return;
  }
  
  runCommand('brew install --cask iterm2', '使用 Homebrew 安装 iTerm2');
}

// 安装 Oh My Posh
function installOhMyPosh() {
  logStep('6️⃣', '安装 Oh My Posh');
  
  if (commandExists('oh-my-posh')) {
    logSuccess('Oh My Posh 已安装');
    return;
  }
  
  if (!commandExists('brew')) {
    logWarning('Homebrew 未安装，无法自动安装 Oh My Posh');
    logWarning('请手动安装 Oh My Posh: https://ohmyposh.dev/docs/installation/macos');
    return;
  }
  
  runCommand('brew install --formula jandedobbeleer/oh-my-posh/oh-my-posh', '使用 Homebrew 安装 Oh My Posh');
  
  // 配置 Oh My Posh
  const isZsh = shellName === '.zshrc';
  const shellType = isZsh ? 'zsh' : 'bash';
  const ohMyPoshConfig = `\n# Oh My Posh 配置\neval "$(oh-my-posh init ${shellType} --config $(brew --prefix oh-my-posh)/themes/atomic.omp.json)"\n`;
  
  if (!fs.readFileSync(configPath, 'utf8').includes('oh-my-posh init')) {
    fs.appendFileSync(configPath, ohMyPoshConfig);
    logSuccess(`Oh My Posh 配置已添加到 ${shellName} 配置文件`);
  }
  
  log('\n💡 提示：', 'cyan');
  log('• 建议安装 Nerd Font 以显示所有图标');
  log('• 可以自定义主题：oh-my-posh init zsh --config ~/.poshthemes/agnoster.omp.json');
}

// 重新加载 shell 配置
function reloadShellConfig() {
  logStep('7️⃣', '重新加载 Shell 配置');
  
  if (!fs.existsSync(configPath)) {
    logWarning('配置文件不存在，跳过重新加载');
    return;
  }
  
  try {
    execSync(`source ${configPath}`, { stdio: 'inherit', shell: true });
    logSuccess('Shell 配置已重新加载');
  } catch (error) {
    logWarning('无法自动重新加载配置，请手动运行: source ~/.zshrc');
  }
}

// 主函数
function main() {
  log('🚀 开始配置 Mac 前端开发环境...', 'bright');
  
  // 检查操作系统
  if (os.platform() !== 'darwin') {
    logError('此脚本仅支持 macOS');
    process.exit(1);
  }
  
  // 执行配置步骤
  installHomebrew();
  installGit();
  installNvm();
  installFzf();
  installITerm2();
  installOhMyPosh();
  reloadShellConfig();
  
  log('\n🎉 Mac 开发环境配置完成！', 'bright');
  log('\n📋 下一步：', 'cyan');
  log('1. 根据项目需求安装合适的 Node.js 版本');
  log('2. 验证安装: git --version');
}

// 运行主函数
main(); 
