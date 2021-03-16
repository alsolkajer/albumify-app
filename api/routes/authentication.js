import AuthenticationController from '../controllers/authentication.controller'
const express = require('express')
const router = express.Router()
const passport = require('passport')

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

router.post('/login', (req, res) => {
  passport.authenticate('local', { session: false }, (err, user, message) => {
    if (err) {
      // you should log it
      return res.status(500).send(err)
    } else if (!user) {
      // you should log it
      return res.status(403).send(message)
    } else {
      const token = AuthenticationController.signUserToken(user)
      return res.send({ token })
    }
  })(req, res)
})

module.exports = router
