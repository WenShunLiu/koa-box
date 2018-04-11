const koaWebhook = require('koa-github-webhook-handler').default;
const { spawn } = require('child_process');
const logger = require('../util/logger/logger');
const webhookHandler = new koaWebhook({
  path: '/kbox/api/v1/github/webhook',
  secret: 'qq649967242'
});

webhookHandler.on('push', eve => {
  const demo = spawn('pwd');
  demo.stdout.on('data', data => {
    console.log('pwd', data.toString())
  })




  const command = spawn('sh', ['../webhooks/shells/push.sh']);
  command.stderr.on('data', data => {
    console.log('push.sh  exc error');
    logger.error(data.toString());
  });
});


module.exports = webhookHandler;