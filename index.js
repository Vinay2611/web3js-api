const express = require('express')
const bodyParser = require('body-parser')

const app = express()
 
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true}))

let port = 3000
if(process.env.SERVER_PORT != undefined){
    port = process.env.SERVER
}

const mongoose = require('mongoose')
require('./account.model')

mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/account', { useNewUrlParser: true })

let db = mongoose.connection

db.on('error', console.error.bind(console, "MongoDBd connection error:"))

let accountDB = db.collection('accounts')

const account  = require('./account.route')

app.use('/account', account)

app.listen( port, () => {
    console.log('Server is up and running on port number' + port)
})