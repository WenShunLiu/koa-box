const http = require('http');
const { spawn } = require('child_process');
const createHandler = require('coding-webhook-handler');
const logger = require('./util/logger/logger');
const hookhandler = createHandler({
  path: '/webhook/kbox',
  token: 'qq649967242'
})

http.createServer((req, res) => {
  hookhandler(req, res, function(err) {
    res.statusCode = 404
    res.end('no such location')
  })
}).listen(8091);

hookhandler.on('error', err => {
  logger.error(err);
});

hookhandler.on('push', event => {
  const command = spawn('sh', ['./webhooks/shells/push.sh']);
  command.stderr.on('data', data => {
    logger.error(data);
  });
})
