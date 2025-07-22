#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');
const { log, logStep, logSuccess, logWarning, logError, commandExists, runCommand, getShellConfigPath } = require('./utils');

// 检查并安装 Homebrew
function installHomebrew() {
  logStep('1️⃣', '检查 Homebrew');
  
  if (commandExists('brew')) {
    logSuccess('Homebrew 已安装');
    return;
  }
  
  logWarning('Homebrew 未安装，正在自动安装...');
  const installCommand = '/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"';
  
  try {
    execSync(installCommand, { stdio: 'inherit' });
    logSuccess('Homebrew 安装完成');
    
    // 添加 Homebrew 路径到配置文件
    const configPath = getShellConfigPath();
    const brewPath = os.arch() === 'arm64' 
      ? 'export PATH="/opt/homebrew/bin:$PATH"'
      : 'export PATH="/usr/local/bin:$PATH"';
    
    if (!fs.readFileSync(configPath, 'utf8').includes(brewPath)) {
      fs.appendFileSync(configPath, `\n# Homebrew\n${brewPath}\n`);
      logSuccess('Homebrew 路径已添加到配置文件');
    }
  } catch (error) {
    logError(`Homebrew 安装失败: ${error.message}`);
    logWarning('请手动安装 Homebrew:');
    logWarning('/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"');
  }
}

// 安装 Git
function installGit() {
  logStep('2️⃣', '安装 Git');
  
  if (commandExists('git')) {
    logSuccess('Git 已安装');
    return;
  }
  
  // 优先使用 Homebrew 安装
  if (commandExists('brew')) {
    runCommand('brew install git', '使用 Homebrew 安装 Git');
    return;
  }
  
  // Homebrew 不可用时，引导用户去官网下载
  logWarning('Homebrew 未安装，无法自动安装 Git');
  logWarning('请从 Git 官网下载安装：https://git-scm.com/download/mac');
}

// 安装 nvm
function installNodeJS() {
  logStep('3️⃣', '安装 nvm');
  
  if (commandExists('nvm')) {
    logSuccess('nvm 已安装');
  } else {
    // 安装 nvm
    const nvmInstallScript = 'curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash';
    runCommand(nvmInstallScript, '安装 nvm');
  }
  
  logSuccess('nvm 安装完成');
  log('\n📋 nvm 基本用法：', 'cyan');
  log('• 安装最新 LTS 版本: nvm install --lts');
  log('• 安装指定版本: nvm install 18.17.0');
  log('• 切换版本: nvm use 18.17.0');
  log('• 设置默认版本: nvm alias default 18.17.0');
  log('• 查看已安装版本: nvm list');
}

// 重新加载 shell 配置
function reloadShellConfig() {
  logStep('4️⃣', '重新加载 Shell 配置');
  
  try {
    const configPath = getShellConfigPath();
    
    if (fs.existsSync(configPath)) {
      execSync(`source ${configPath}`, { stdio: 'inherit', shell: true });
      logSuccess('Shell 配置已重新加载');
    }
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
  installNodeJS();
  reloadShellConfig();
  
  log('\n🎉 Mac 开发环境配置完成！', 'bright');
  log('\n📋 下一步：', 'cyan');
  log('1. 根据项目需求安装合适的 Node.js 版本');
  log('2. 验证安装: git --version');
}

// 运行主函数
main(); 
