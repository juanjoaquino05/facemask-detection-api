const express = require('express')
const multer = require('multer')

const maxFileSizeMB = 0 * 1024 * 1024
const acceptedImageMimeTypes = [
    'image/jpeg', 'image/png', 'image/jpg'
]

const upload = multer({
    limits: { fileSize: maxFileSizeMB }
}).single('image')

const images = express.Router();

images.use(function(req, res, next) {
    next()
});

images.post('/detect', (request, response) => {
    upload(request, response, function (err) {
        if (err instanceof multer.MulterError) {
          // A Multer error occurred when uploading.
          response.json({ "error" : err.message }, 500)
        } else if (err) {
          // An unknown error occurred when uploading.
          response.json({ "error" : err.message }, 500)
        }
    
        // Everything went fine.
        const image = request.file

        if(acceptedImageMimeTypes.indexOf(image.mimetype) < 0){
            response.json({ "error" : "Invalid Image Type" }, 500)
        }

        response.json({ "1" : "" });
    })
    
});

images.get('/params', function(resquest, response) {
    response.json({
        "arg" : process.argv,
        "env" : process.env
    })
});

module.exports.images = images;