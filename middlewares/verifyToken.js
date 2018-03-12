const tokenOpt = require('../util/token/index')
const userService = require('../service/userInfoService')
module.exports = async (ctx, next) => {
  try {
    console.log(ctx.request.url)
    if (ctx.request.url.includes('/api/user/login') || ctx.request.url.includes('/api/user/register')) {
      await next()
      return
    }
    const BearerToken = ctx.get('authorization')
    if (!BearerToken) {
      ctx.throw(403, '请先登录', {url: 'wenshunliu.com'})
    }
    const token = BearerToken.split('Bearer ')[1]
    const user = tokenOpt.verify(token, ctx)
    const userinfo = await userService.getUserByName(user.username)
    if (!userinfo) {
      ctx.throw(403, 'token失效', {url: 'wenshunliu.com'})
    }
    await next()
  } catch (error) {
    ctx.app.emit('error', error, ctx)
  }
}