const path = require('path')
const crypto = require('crypto')
const express = require('express')
const router = express.Router()
const Grid = require('gridfs-stream')
const multer = require('multer')
const GridFsStorage = require('multer-gridfs-storage')
const mongoose = require('mongoose')

const conn = mongoose.connection

const db = require('../config/keys').MongoURI

// Init gfs
let gfs

conn.once('open', () => {
  // Init stream
  gfs = Grid(conn.db, mongoose.mongo)
  gfs.collection('uploads')
})

// Create storage engine
const storage = new GridFsStorage({
  url: db,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err)
        }
        const changedFilename = path.basename(file.originalname) +
        '-' + buf.toString('hex') +
        path.extname(file.originalname)
        const fileInfo = {
          filename: changedFilename,
          bucketName: 'uploads'
        }
        resolve(fileInfo)
      })
    })
  },
  options: { useUnifiedTopology: true }
})
const upload = multer({ storage })

// Uploading a file
router.post('/upload', upload.single('file'), (req, res) => {
  res.json({ file: req.file })
})

// Files
router.get('/', (req, res) => {
  gfs.files.find().toArray((err, files) => {
    if (err) {
      // If collection find error
      return res.status(400).send(err)
    } else if (!files || files.length === 0) {
      // If files does not exist
      return res.status(404).json({ err: 'No files exist' })
    } else {
      // Files exist
      return res.json(files)
    }
  })
})

// Showing files API
router.get('/show', (req, res) => {
  gfs.files.find().toArray((err, files) => {
    // Check if files
    if (err) {
      // If collection find error
      return res.status(400).send(err)
    } else if (!files || files.length === 0) {
      // If there's no files
      return res.json({ err: 'No files exist' })
    } else {
      files.map((file) => {
        if (
          file.contentType === 'image/jpeg' ||
          file.contentType === 'image/png'
        ) {
          file.isImage = true
        } else {
          file.isImage = false
        }
      })
      res.json(files)
    }
  })
})

// Download file URL
router.get('/:filename', (req, res) => {
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    if (err) {
      // If collection find error
      return res.status(400).send(err)
    } else if (!file || file.length === 0) {
      // If files does not exist
      return res.status(404).json({ err: 'No file exist' })
    } else {
      // Read output to browser
      const readstream = gfs.createReadStream(file.filename)
      readstream.pipe(res)
    }
  })
})

// Showing image file. cannot be accessed for non image file
router.get('/image/:filename', (req, res) => {
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    if (err) {
      // If collection find error
      return res.status(400).send(err)
    } else if (!file || file.length === 0) {
      // If files does not exist
      return res.status(404).json({ err: 'No file exist' })
    } else if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
      // Read output to browser
      const readstream = gfs.createReadStream(file.filename)
      readstream.pipe(res)
    } else {
      // Detect if not image
      res.status(404).json({
        err: 'Not an image'
      })
    }
  })
})

module.exports = router
