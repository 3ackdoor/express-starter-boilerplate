const functions = require('firebase-functions')
const express = require('express')

const cors = require('cors')
const compression = require('compression')
const helmet = require('helmet')
const morgan = require('morgan')

const { errorHandler } = require('./utils/index')
const notiController = require('./controllers/notification.controller')

const app = express()

app.use(morgan('combined'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(compression())
app.use(helmet())
app.use(cors())

app.use('/notification', notiController)

// catch 404 and forward to error handler
app.use(async (req, res, next) => {
  next(await errorHandler('notFound', 404))
})
// error handler
app.use(async (err, req, res, next) => {
  console.log(err)
  let { status, message, ...error } = err
  res.status(status || 500)
  res.send({ message: message || 'internalError', statusCode: res.statusCode, ...error })
})

exports.app = functions.https.onRequest(app)
