const Koa = require('koa')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const verifyToken = require('./middlewares/verifyToken')


const logger = require('./util/logger/logger')
const routers = require('./routes/api/index')
require('./service/db_connect')

const app = new Koa()
const router = new Router()
app.use(bodyParser())

app.use(verifyToken)

app.use(routers.routes())



router.use('/api', routers.routes())



// error handle
app.on('error', (err, ctx) => {
  logger.error(err)
  if (err.status) {
    ctx.status = err.status
  }
  ctx.body = {
    retCode: 'error',
    retMsg: err.httpMsg || err.message,
    url: err.status === 403 ? err.url : undefined
  }
})

app.listen(8090)

logger.info('----服务启动成功，port: 8090----')