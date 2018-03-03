const HttpBaseError = require('./http_base_error')

const ERROR_CODE = 50000

class InternalServerError extends HttpBaseError {
  constructor(msg) {
    super(500, `服务器开小差了，请稍后再试`, ERROR_CODE, `something wrong in servive${msg}`)
  }
}

module.exports = InternalServerError