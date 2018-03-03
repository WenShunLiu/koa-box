const user = require('../service/user')
const DBDataFoundError = require('../errors/db_data_found_error')

const getUserById = async (ctx, next) => {
  try {

    const id = ctx.params.id
    const result = await user.getUserById(id)
    if (result === null) {
      const dataerr =  new DBDataFoundError('users', 'id', id, `未找到id为${id}的用户`)
      ctx.throw(404, dataerr)
    }
    ctx.body = {
      data: result,
      retCode: 'success'
    }

  } catch (err) {
    // ctx.throw(err)
    // koa中在trycatch中捕获的错误事件要手动触发error
    ctx.app.emit('error', err, ctx)
  }
}

module.exports = {
  getUserById
}