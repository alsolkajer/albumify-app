import AuthenticationController from '../controllers/authentication.controller'
const express = require('express')
const router = express.Router()

router.post('/login', async (req, res) => {
})

router.get('/user', async (req, res) => {
  res.send('It works!')
})

router.post('/register', async (req, res) => {
  const password = req.body.password
  const email = req.body.email
  const hashedPassword = await AuthenticationController.generatePasswordHash(password)
  const userExist = await AuthenticationController.UserExist(email)

  if (userExist) {
    res.send({ message: 'User does exist!' })
  } else {
    await AuthenticationController.CreateUser(email, hashedPassword)
      .then(() => {
        res.send({ message: 'An account has been created!' })
      }).catch((err) => {
        throw err
      })
  }
})

module.exports = router
