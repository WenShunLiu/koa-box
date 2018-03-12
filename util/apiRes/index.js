const DBDataFoundError = require('../../errors/db_data_found_error')

const apiRes = (ctx, result, error) => {
  if (result === null && error) {
    const dataerr =  new DBDataFoundError(...error)
    ctx.throw(404, dataerr)
  }
  ctx.body = {
    data: result,
    retCode: 'success'
  }
}

module.exports = apiRes