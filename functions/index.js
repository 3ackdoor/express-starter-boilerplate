const functions = require('firebase-functions')
const admin = require('firebase-admin')
const express = require('express')

const cors = require('cors')
const compression = require('compression')
const helmet = require('helmet')
const morgan = require('morgan')

const { errorHandler } = require('./utils/index')
const serviceAccount = require('./config.json')

const notiRouter = require('./routes/notification')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://beagle-71317.firebaseio.com',
})

const app = express()

app.use(morgan('combined'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(compression())
app.use(helmet())
app.use(cors())

app.use('/notification', notiRouter)

// catch 404 and forward to error handler
app.use(async (req, res, next) => {
  next(await errorHandler('NotFound', 404))
})
// error handler
app.use(async (err, req, res, next) => {
  console.log(err)
  const { status, message, ...error } = err
  res.status(status || 500)
  res.send({ message: message || 'InternalError', statusCode: res.statusCode, ...error })
})

exports.app = functions.https.onRequest(app)
