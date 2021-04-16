const express = require('express')

const images = express.Router();

images.use(function(req, res, next) {
    next()
});

images.post('/detect', function(resquest, response) {
    response.json(process.env)
});

images.get('/params', function(resquest, response) {
    response.json({
        "arg" : process.argv,
        "env" : process.env
    })
});

module.exports.images = images;