const userInfo = require('../../service/v1/userInfoService')
const DBDataFoundError = require('../../errors/db_data_found_error')
const apiRes = require('../../util/apiRes')

const getUserById = async (ctx, next) => {
  try {
    const id = ctx.params.id
    const result = await userInfo.getUserById(id)
    const errorObj = ['user','id', id, `未找到id为${id}的用户`]
    apiRes(ctx, result, errorObj)
  } catch (err) {
    // ctx.throw(err)
    // koa中在trycatch中捕获的错误事件要手动触发error
    ctx.app.emit('error', err, ctx)
  }
}

const login = async (ctx, next) => {
  try {
    const result = await userInfo.login(ctx)
    apiRes(ctx, result)
  } catch (error) {
    ctx.app.emit('error', error, ctx)
  }
}

const register = async (ctx, next) => {
  try {
    const result = await userInfo.register(ctx)
    apiRes(ctx, result)
  } catch (error) {
    ctx.app.emit('error', error, ctx)
  }
}
 
module.exports = {
  getUserById,
  register,
  login
}