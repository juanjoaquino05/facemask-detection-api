const {ImageAnalyze} = require('../services/ImageAnalyze.js')

const express = require('express')
const multer = require('multer')

const maxFileSizeMB = 4 * 1024 * 1024
const acceptedImageMimeTypes = [
    'image/jpeg', 'image/png', 'image/jpg'
]

const upload = multer({
    limits: { fileSize: maxFileSizeMB }
}).single('image')

const images = express.Router()

images.post('/detect', (request, response) => {
  upload(request, response, async function (err) {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
      return response.status(500).json({ "error" : err.message })
    } else if (err) {
      // An unknown error occurred when uploading.
      return response.status(500).json({ "error" : err.message })
    }
    
    // Everything went fine.
    const image = request.file
    
    if(acceptedImageMimeTypes.indexOf(image.mimetype) < 0){
      return response.status(500).json({ "error" : "Invalid Image Type" })
    }
    
    try {
      const resultsAnalyze = await new ImageAnalyze().ProcessImage(image.buffer)
      
      response.status(200).json(resultsAnalyze)
    } catch (err) {
      return response.status(500).json({ "error" : err.message })
    }
  })
    
})

module.exports.images = images