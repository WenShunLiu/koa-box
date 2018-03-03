const Router = require('koa-router')
const user = require('../controller/user')
const router = new Router()

router.get('/:id', user.getUserById)

module.exports = router