const user = require('./user')
const Router = require('koa-router')
const router = new Router()

router.use('/user', user.routes())

module.exports = router