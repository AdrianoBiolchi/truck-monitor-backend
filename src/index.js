const { response } = require('express')
const express = require('express')
const routes = require('./routes')
const path = require('path')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv').config()

/**
 * App use
 */
// app.use(cors())
//app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(routes)


var Port = process.env.PORT || 3333

app.listen(Port, () => {
  console.log('🚀 Back-end Truck Monitor started', +Port)
})

