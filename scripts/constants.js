// Git 别名配置
const GIT_ALIASES = {
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

module.exports = {
  GIT_ALIASES
}; 