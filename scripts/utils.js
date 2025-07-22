// 颜色输出
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function logStep(step, message) {
  log(`\n${step} ${message}`, 'cyan');
}

function logSuccess(message) {
  log(`✅ ${message}`, 'green');
}

function logWarning(message) {
  log(`⚠️  ${message}`, 'yellow');
}

function logError(message) {
  log(`❌ ${message}`, 'red');
}

// 检查命令是否存在
function commandExists(command) {
  const { execSync } = require('child_process');
  try {
    execSync(`which ${command}`, { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
}

// 执行命令
function runCommand(command, description) {
  const { execSync } = require('child_process');
  try {
    log(`🔄 ${description}...`);
    execSync(command, { stdio: 'inherit' });
    logSuccess(`${description} 完成`);
    return true;
  } catch (error) {
    logError(`${description} 失败: ${error.message}`);
    return false;
  }
}

// 获取 shell 配置文件路径
function getShellConfigPath() {
  const os = require('os');
  const path = require('path');
  const homeDir = os.homedir();
  const shell = process.env.SHELL || '';
  const configFile = shell.includes('bash') ? '.bashrc' : '.zshrc';
  return path.join(homeDir, configFile);
}

module.exports = {
  colors,
  log,
  logStep,
  logSuccess,
  logWarning,
  logError,
  commandExists,
  runCommand,
  getShellConfigPath
}; 
