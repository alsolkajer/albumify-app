/* eslint-disable no-console */
const express = require('express')
const app = express()
const passport = require('passport')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const helmet = require('helmet')

app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: false }))

// Securing Http header
app.use(helmet())

// DB Configuration
const db = require('./config/keys').MongoURI

// Initializing Passport
app.use(passport.initialize())

// Connect to Mongo
mongoose.connect(db, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true
})
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err))

// Routes to authentication API

app.use('/auth', require('./routes/authentication'))
app.use('/files', require('./routes/files'))
app.use('/dashboard', require('./routes/dashboard'))

export default {
  path: '/api',
  handler: app
}
