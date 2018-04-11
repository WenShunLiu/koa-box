const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const verifyToken = require('./middlewares/verifyToken');
const webhook = require('./middlewares/webhook');

const logger = require('./util/logger/logger');
const routers = require('./routes/api/index');
require('./service/db_connect');

const app = new Koa();
// 自定义koa状态码
require('koa-custom-statuses')(app, {
  '499': 'Authration Forbidden',
});
const router = new Router();
app.use(bodyParser());
app.use(verifyToken);
app.use(webhook.middleware());

app.use(routers.routes());

const BASE_URL = '/kbox/api';
router.use(BASE_URL, routers.routes());


// error handle
app.on('error', (err, ctx) => {
  logger.error(err);
  if (err.status) {
    ctx.status = err.status;
  }
  ctx.body = {
    retCode: 'error',
    retMsg: err.httpMsg || err.message,
    url: err.status === 499 ? err.url : undefined
  };
});

app.listen(8090, () => {
  logger.info('----服务启动成功，port: 8090__+++==')
});