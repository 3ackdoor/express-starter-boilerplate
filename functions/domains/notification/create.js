const admin = require('firebase-admin')
const { isRequiredField } = require('../../utils/index')
const db = admin.database()

module.exports = async (body) => {
  const { store, data, ...rest } = body
  const validate = {
    store: true,
    data: true,
  }
  await isRequiredField(body, validate)
  const notiRef = await db.ref('notification').push()
  await notiRef.set({ store: store, data: data, ...rest })
  return { refKey: notiRef.key, body }
}
