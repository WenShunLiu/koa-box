const HttpBaseError = require('./http_base_error')

const ERROR_CODE = 40400

class ResouceFoundError extends HttpBaseError {
  constructor(resourceName, resourceId, Httpmsg) {
    super(404, Httpmsg, ERROR_CODE, `${resourceName} not found id: ${resourceId}`)
  }
}

module.exports = ResouceFoundError