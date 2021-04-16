const express = require('express')

const images = express.Router();

images.use(function(req, res, next) {
    next()
});

images.post('/detect', function(resquest, response) {
    response.send({ "key" :"value"})
});

module.exports.images = images;