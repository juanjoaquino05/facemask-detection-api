// Importing Express
let express = require('express')
let app = express()

// Getting args with param names
const args = require('minimist')(process.argv.slice(2));

// Getting port from args, env or default
const PORT = args.p || process.env.PORT || 3000

// Using routes defined before
app.use('/', require('./routes/Index').index)
app.use('/images', require('./routes/Images').images)

// Put app in listen mode on port
app.listen(PORT)

