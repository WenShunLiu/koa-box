const koaWebhook = require('koa-github-webhook-handler').default;
const { spawn } = require('child_process');
const logger = require('../util/logger/logger');
const webhookHandler = new koaWebhook({
  path: '/github/webhook',
  secret: 'qq649967242'
});

webhookHandler.on('push', eve => {
  const command = spawn('sh', ['../webhooks/shells/push.sh']);
  command.stderr.on('data', data => {
    logger.error(data);
  });
});


module.exports = webhookHandler;