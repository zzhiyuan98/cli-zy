#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');
const { log, logSuccess, logError, commandExists } = require('./utils');

// Git URL 正则表达式
const REGEX_GIT_URLS = [
  /^git@([^:]+):(.*?)(\.git)?$/,
  /^https?:\/\/([^\/]+)\/(.*?)(\.git)?$/,
  /^ssh:\/\/git@([^\/]+)\/(.*?)(\.git)?$/
];

const HOME = os.homedir();

// 智能克隆 Git 仓库
function cloneRepository(url) {
  log('🚀 开始智能克隆 Git 仓库...', 'bright');
  
  // 检查 Git 是否安装
  if (!commandExists('git')) {
    logError('Git 未安装，请先运行 cli-zy setup');
    process.exit(1);
  }
  
  // 智能解析 URL
  let processedUrl = url;
  
  // 如果不是完整的 Git URL，进行智能处理
  if (!url.startsWith('git@') && !url.startsWith('http') && !url.startsWith('ssh:')) {
    if (url.split('/').length === 2) {
      // 格式: username/repo
      const sshKeyPath = path.join(HOME, '.ssh', 'id_rsa');
      if (fs.existsSync(sshKeyPath)) {
        processedUrl = `git@github.com:${url}.git`;
      } else {
        processedUrl = `https://github.com/${url}.git`;
      }
    } else {
      // 其他格式，添加 https://
      processedUrl = `https://${url}`;
    }
  }
  
  // 解析 URL 获取域名和项目名
  const match = (() => {
    for (const regex of REGEX_GIT_URLS) {
      const match = processedUrl.match(regex);
      if (match) {
        return match;
      }
    }
    return null;
  })();
  
  if (!match) {
    logError(`无法解析 Git URL: ${url}`);
    process.exit(1);
  }
  
  const [, domain, project] = match;
  const cleanDomain = domain.split(':')[0]; // 移除 SSH 端口
  
  // 构建目标路径
  const workspace = path.join(HOME, 'code', 'src');
  const targetPath = path.join(workspace, cleanDomain, project);
  
  // 确保工作区目录存在
  if (!fs.existsSync(workspace)) {
    fs.mkdirSync(workspace, { recursive: true });
  }
  
  // 确保目标目录的父目录存在
  const targetDir = path.dirname(targetPath);
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }
  
  // 检查目标目录是否已存在
  if (fs.existsSync(targetPath)) {
    logError(`目录已存在: ${targetPath}`);
    logError('请删除现有目录或选择其他位置');
    process.exit(1);
  }
  
  try {
    // 执行克隆命令
    log(`📥 克隆仓库到: ${targetPath}`);
    execSync(`git clone -o o ${processedUrl} ${targetPath}`, { stdio: 'inherit' });
    
    logSuccess('✅ 仓库克隆成功！');
    log(`📁 位置: ${targetPath}`);
    
    // 显示后续操作提示
    log('\n💡 后续操作：', 'cyan');
    log(`cd ${targetPath}`);
    log('npm install  # 如果是 Node.js 项目');
    log('pip install -r requirements.txt  # 如果是 Python 项目');
    
  } catch (error) {
    logError(`克隆失败: ${error.message}`);
    process.exit(1);
  }
}

// 主函数
function main() {
  const args = process.argv.slice(2);
  const url = args[0] === 'clone' ? args[1] : args[0];
  
  if (url) {
    cloneRepository(url);
    return;
  }
  
  // 显示帮助信息而不是错误
  log('📋 cli-zy clone - 智能克隆 Git 仓库');
  log('使用方法: cli-zy clone <repository-url>');
  log('示例: cli-zy clone username/repo');
}

// 运行主函数
main(); 
