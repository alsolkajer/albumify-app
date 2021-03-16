/* eslint-disable no-console */
const express = require('express')
const app = express()

const mongoose = require('mongoose')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/test', function (req, res) {
  res.send('Test successful')
})

// DB Configuration
const db = require('./config/keys').MongoURI

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
