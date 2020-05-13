const express = require('express')
const router = express.Router()

const { db, errorHandler } = require('../utils/index')
const createNotification = require('../domains/notification/create')

router.post('/create', async (req, res, next) => {
  const ref = await db.ref('notification').push()
  await ref.set({ name: 'nurse' })
  res.send({ key: ref.key, path: ref })
})

router.get('/list', async (req, res, next) => {
  const result = await db.ref('notification').once('value', (snapShot) => {
    let arr = []
    snapShot.forEach((childSnapShot) => {
      arr.push(childSnapShot.key, childSnapShot.val())
    })
    return arr
  })
  res.send({ data: result })
})

router.get('/get', async (req, res, next) => {
  res.send('Hello World')
})

router.get('/error', async (req, res, next) => {
  try {
    throw await errorHandler('notFount', 404, 'testError')
  } catch (err) {
    return next(err)
  }
})

// Not-Test-Yet
router.post('/', async (req, res, next) => {
  try {
    const { body } = req
    const resp = createNotification(body)
    res.status(200).send({ data: resp, status: 'success', statusCode: 200 })
  } catch (err) {
    next(err)
  }
})

module.exports = router
