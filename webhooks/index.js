const { spawn } = require('child_process');
const createHandler = require('coding-webhook-handler');
const logger = require('../util/logger/logger');
const hookhandler = createHandler({
  path: '/kbox/api/v1/github/webhook',
  token: 'qq649967242'
})

const webhook = async ctx => {
  hookhandler(async ctx => {
    ctx.status = 404;
    ctx.body = 'no such location';
  })
};
hookhandler.on('error', err => {
  logger.error(err);
});
hookhandler.on('push', event => {
  const command = spawn('sh', ['./shells/push.sh']);
  command.stderr.on('data', data => {
    logger.error(data);
  });
})

module.exports = webhook;