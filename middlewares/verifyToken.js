const tokenOpt = require('../util/token/index')
const userService = require('../service/v1/userInfoService')
module.exports = async (ctx, next) => {
  try {
    if (ctx.request.url.includes('user/login') || ctx.request.url.includes('user/register')) {
      await next()
      return
    }
    const BearerToken = ctx.get('authorization')
    if (!BearerToken) {
      ctx.throw(499, '请先登录', {url: 'wenshunliu.com'})
    }
    const token = BearerToken.split('Bearer ')[1]
    const user = tokenOpt.verify(token, ctx)
    const userinfo = await userService.getUserByName(user.username)
    if (!userinfo) {
      ctx.throw(499, 'token失效', {url: 'wenshunliu.com'})
    }
    await next()
  } catch (error) {
    ctx.app.emit('error', error, ctx)
  }
}