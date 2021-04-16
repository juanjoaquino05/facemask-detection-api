var express = require('express')
var app = express()

app.use('/', require('./routes/Index').index)
app.use('/images', require('./routes/Images').images)

app.listen(3000)

