/* eslint-disable no-console */
const express = require('express')
const app = express()
const passport = require('passport')
const cookieParser = require('cookie-parser')

const mongoose = require('mongoose')

app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: false }))

app.get('/test', function (req, res) {
  res.send('Test successful')
})

// DB Configuration
const db = require('./config/keys').MongoURI

// Initializing Passport
app.use(passport.initialize())

// Connect to Mongo
mongoose.connect(db, { useNewUrlParser: true })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err))

// Routes to authentication API

app.use('/auth', require('./routes/authentication'))

export default {
  path: '/api',
  handler: app
}
