const errorHandler = (message, statusCode, errors) => {
  let error = new Error(`${message}`)
  error.status = statusCode
  error.errors = errors
  return error
}

module.exports = {
  errorHandler,
}
