const R = require('ramda')

const admin = require('firebase-admin')
const serviceAccount = require('../config.json')

const init = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://beagle-71317.firebaseio.com',
})

const db = init.database()

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
  db,
  errorHandler,
  isRequiredField,
}
