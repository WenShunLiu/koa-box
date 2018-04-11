const koaWebhook = require('koa-github-webhook-handler').default;
const { spawn } = require('child_process');
const logger = require('../util/logger/logger');
const webhookHandler = new koaWebhook({
  path: '/kbox/api/v1/github/webhook',
  secret: 'qq649967242'
});

webhookHandler.on('push', eve => {
  // 观察脚本执行路径
  const urlsh = spawn('pwd');
  urlsh.stdout.on('data', data => {
    console.log('pwd', data.toString())
  });
  urlsh.on('close', code => {
    console.log('urlsh  close', code);
  });
  urlsh.on('error', err => {
    console.log('urlsh 启动失败 !');
  });
  // 执行自动部署子进程
  const command = spawn('sh', ['./webhooks/shells/push.sh']);
  command.on('close', code => {
    logger.info('自动部署子进程  close success');
  });

  command.on('error', err => {
    logger.error('自动部署子进程 启动失败 !');
    logger.error(err);
  });
  command.stderr.on('data', data => {
    console.log('push.sh  exc error');
    logger.error(data.toString());
  });
  command.stdout.on('data', data => {
    console.log('脚本输出：', data.toString())
  })
});


module.exports = webhookHandler;