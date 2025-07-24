#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');
const { log, logStep, logSuccess, logWarning, logError, commandExists, runCommand, getShellConfigPath } = require('./utils');
const { GIT_ALIASES } = require('./constants');

const configPath = getShellConfigPath();
const shellName = path.basename(configPath);

function getConfigContent() {
  return fs.readFileSync(configPath, 'utf8');
}

function installHomebrew() {
  logStep('1️⃣', '检查 Homebrew');
  
  if (commandExists('brew')) {
    logSuccess('Homebrew 已安装');
    return;
  }
  
  logWarning('Homebrew 未安装，正在自动安装...');
  logWarning('安装过程可能需要输入管理员密码');
  const script = '/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"';
  
  try {
    execSync(script, { stdio: 'inherit' });
    logSuccess('Homebrew 安装完成');
  } catch (error) {
    logError(`Homebrew 安装失败: ${error.message}`);
    logWarning('请手动安装 Homebrew:');
    logWarning('/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"');
    return;
  }
  
  const path = os.arch() === 'arm64' 
    ? 'export PATH="/opt/homebrew/bin:$PATH"'
    : 'export PATH="/usr/local/bin:$PATH"';
  
  if (!fs.readFileSync(configPath, 'utf8').includes(path)) {
    fs.appendFileSync(configPath, `\n# Homebrew\n${path}\n`);
    logSuccess('Homebrew 路径已添加到配置文件');
  }
}

function installGit() {
  logStep('2️⃣', '安装 Git 并配置别名');
  
  const installed = (() => {
    if (commandExists('git')) {
      logSuccess('Git 已安装');
      return true;
    }
    
    if (!commandExists('brew')) {
      logWarning('Homebrew 未安装，无法自动安装 Git');
      logWarning('请从 Git 官网下载安装：https://git-scm.com/download/mac');
      return false;
    }
    
    return runCommand('brew install git', '使用 Homebrew 安装 Git');
  })();
  
  if (!installed) {
    return;
  }
  
  logStep('2️⃣', '配置 Git 快捷命令别名');
  log(`📁 配置文件: ${configPath}`);
  
  let addedAliases = [];
  const configContent = getConfigContent();
  
  Object.entries(GIT_ALIASES).forEach(([alias, command]) => {
    if (!configContent.includes(`alias ${alias}=`)) {
      addedAliases.push({ alias, command });
    }
  });
  
  if (addedAliases.length > 0) {
    const config = '\n' + addedAliases.map(({ alias, command }) => `alias ${alias}='${command}'`).join('\n') + '\n';
    fs.appendFileSync(configPath, config);
    logSuccess(`Git 别名配置完成，添加了 ${addedAliases.length} 个新别名`);
  } else {
    logSuccess('所有 Git 别名已存在，无需添加');
  }
  
  log('\n📋 可用的 Git 快捷命令：', 'cyan');
  Object.entries(GIT_ALIASES).forEach(([alias, command]) => {
    log(`   ${alias.padEnd(4)} - ${command}`);
  });
}

function setupWorkspace() {
  logStep('5️⃣', '配置工作区快捷切换功能');
  log(`📁 配置文件: ${configPath}`);
  
  const configContent = fs.readFileSync(configPath, 'utf8');
  if (configContent.includes('ws () {')) {
    logWarning('工作区快捷功能已存在，跳过设置');
    logWarning(`如需重新设置，请先手动删除 ${shellName} 中的工作区配置`);
    return;
  }
  
  if (!fs.existsSync(configPath)) {
    log(`📝 创建 ${shellName} 文件...`);
    fs.writeFileSync(configPath, '');
  }
  
  const config = `
ws () {
  WS=\$(find ~/code/src -maxdepth 5 -type d -name .git | sed "s/\\/\\.git//" | fzf -1 -0)
  cd "\${WS}" || exit
}
`;
  
  fs.appendFileSync(configPath, config);
  logSuccess('工作区快捷功能配置完成');
  
  log('\n📋 工作区快捷命令：', 'cyan');
  log('   ws   - 快速切换到 Git 仓库工作区');
}

function installNvm() {
  logStep('4️⃣', '安装 nvm');
  
  if (commandExists('nvm')) {
    logSuccess('nvm 已安装');
    return;
  }
  
  const script = 'curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash';
  runCommand(script, '安装 nvm');
  
  const configContent = getConfigContent();
  if (!configContent.includes('export NVM_DIR')) {
    const config = `
# nvm 配置
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \\. "$NVM_DIR/nvm.sh"
[ -s "$NVM_DIR/bash_completion" ] && \\. "$NVM_DIR/bash_completion"
`;
    fs.appendFileSync(configPath, config);
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

function installITerm2() {
  logStep('7️⃣', '安装 iTerm2');
  
  if (fs.existsSync('/Applications/iTerm.app')) {
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

function installOhMyPosh() {
  logStep('8️⃣', '安装 Oh My Posh');
  
  const installed = (() => {
    if (commandExists('oh-my-posh')) {
      logSuccess('Oh My Posh 已安装');
      return true;
    }
    
    if (!commandExists('brew')) {
      logWarning('Homebrew 未安装，无法自动安装 Oh My Posh');
      logWarning('请手动安装 Oh My Posh: https://ohmyposh.dev/docs/installation/macos');
      return false;
    }
    
    return runCommand('brew install --formula jandedobbeleer/oh-my-posh/oh-my-posh', '使用 Homebrew 安装 Oh My Posh');
  })();
  
  if (!installed) {
    return;
  }
  
  logStep('8️⃣', '配置 Oh My Posh');
  log(`📁 配置文件: ${configPath}`);
  
  const isZsh = shellName === '.zshrc';
  const shellType = isZsh ? 'zsh' : 'bash';
  const config = `\n# Oh My Posh 配置\neval "$(oh-my-posh init ${shellType} --config $(brew --prefix oh-my-posh)/themes/atomic.omp.json)"\n`;
  
  const configContent = getConfigContent();
  if (!configContent.includes('oh-my-posh init')) {
    fs.appendFileSync(configPath, config);
    logSuccess(`Oh My Posh 配置已添加到 ${shellName} 配置文件`);
  }
  
  log('\n💡 提示：', 'cyan');
  log('• 建议安装 Nerd Font 以显示所有图标');
  log('• 可以自定义主题：oh-my-posh init zsh --config ~/.poshthemes/agnoster.omp.json');
}

function reloadShellConfig() {
  logStep('9️⃣', '重新加载 Shell 配置');
  
  try {
    execSync(`source ${configPath}`, { stdio: 'inherit', shell: true });
    logSuccess('Shell 配置已重新加载');
  } catch (error) {
    logWarning('无法自动重新加载配置，请手动运行: source ~/.zshrc');
  }
}

function main() {
  log('🚀 开始配置 Mac 前端开发环境...', 'bright');
  
  if (os.platform() !== 'darwin') {
    logError('此脚本仅支持 macOS');
    process.exit(1);
  }
  
  if (!fs.existsSync(configPath)) {
    log(`📝 创建 ${shellName} 文件...`);
    fs.writeFileSync(configPath, '');
  }
  
  installHomebrew();
  installGit();
  installNvm();
  installFzf();
  setupWorkspace();
  installITerm2();
  installOhMyPosh();
  reloadShellConfig();
  
  log('\n🎉 Mac 开发环境配置完成！', 'bright');
  log('\n📋 下一步：', 'cyan');
  log('1. 根据项目需求安装合适的 Node.js 版本');
  log('2. 验证安装: git --version');
}

main(); 
