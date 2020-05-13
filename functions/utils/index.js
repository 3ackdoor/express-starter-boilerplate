const errorHandler = async (message, statusCode, errors) => {
  let error = new Error(`${message}`)
  error.status = statusCode
  error.errors = errors
  return error
}

const isRequiredField = async (obj, validate) => {
  let errors = {}
  Object.keys(validate).forEach((key) => {
    if (!R.path([key], obj) || R.isEmpty(R.path([key], obj))) {
      errors = {
        ...errors,
        [key]: `field is required`,
      }
    }
  })

  if (!R.isEmpty(errors)) {
    throw errorHandler('ValidationException', 400, errors)
  }
  return true
}

module.exports = {
  errorHandler,
  isRequiredField,
}
