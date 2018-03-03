const HttpBaseError = require('./http_base_error')

const ERROR_CODE = 40401

class DBDataFoundError extends HttpBaseError {
  constructor(db, name, data, Httpmsg) {
    super(404, Httpmsg, ERROR_CODE, `${name}: ${data} not found in ${db} database`)
  }
}

module.exports = DBDataFoundError