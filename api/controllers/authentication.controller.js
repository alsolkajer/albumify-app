const bcrypt = require('bcrypt')
const User = require('../models/User')

async function CreateUser (email, password) {
  return await User.create({ email, password })
    .then((data) => {
      return data
    }).catch((error) => {
      throw error
    })
}

async function UserExist (email) {
  return await User.exists({ email })
    .then((data) => {
      return data
    }).catch((error) => {
      throw error
    })
}

async function GetUser (email) {
  return await User.findOne({ email })
    .then((data) => {
      return data
    }).catch((error) => {
      throw error
    })
}

async function generatePasswordHash (plainPassword) {
  return await bcrypt.hash(plainPassword, 12)
}

export default {
  CreateUser,
  GetUser,
  UserExist,
  generatePasswordHash
}
