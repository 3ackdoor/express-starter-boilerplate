const express = require('express')
const router = express.Router()

router.get('/get', async (req, res, next) => {
  res.send('Hello World')
})

router.get('/error', async (req, res, next) => {
  try {
    throw new Error()
  } catch (err) {
    return next(err)
  }
})

module.exports = router
