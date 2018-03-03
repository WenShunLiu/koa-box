const Koa = require('koa')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const logger = require('./util/logger/logger')

const userRouter = require('./routes/user')
require('./service/db_connect')

const app = new Koa()
const router = new Router()
app.use(bodyParser())
app.use(router.routes())



router.use('/user', userRouter.routes())



// error handle
app.on('error', (err, ctx) => {
  logger.error(err.message)
  ctx.body = {
    retCode: 'error',
    retMsg: err.httpMsg
  }
})

app.listen(8090)

logger.info('---服务启动成功，port: 8090---')