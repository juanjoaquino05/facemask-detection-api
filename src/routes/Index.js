const express = require('express')

const index = express.Router();

index.use(function(req, res, next) {
    next()
});

index.post('/', function(resquest, response) {
    response.send({ "key" :"value"})
});

module.exports.index = index;