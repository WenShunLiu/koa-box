const HttpBaseError = require('./http_base_error.js')

const ERROR_CODE = 40000
class HttpReqParamsError extends HttpBaseError {
  constructor(paramName, desc, msg) {
    super(400, `参数不合法 ${desc}`, ERROR_CODE, `${paramName} wrong ${msg}`)
  }
}

module.exports = HttpReqParamsError