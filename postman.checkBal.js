const express = require('express')
//const balance = express.Router()

const bodyParser = require('body-parser')
const app = express()
 
//app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true}))

let port = 3000
if(process.env.SERVER_PORT != undefined){
    port = process.env.SERVER
}

 

app.use(express.json())

const route  = require('./balance')
app.use('/', route)

app.listen( port, () => {
    console.log('Server is up and running on port number' + port)
})



