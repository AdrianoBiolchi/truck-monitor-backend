const { response } = require('express')
const express = require('express')
const routes = require('./routes')

const app = express()

app.use(routes)

var Port = process.env.PORT || 3333

app.listen(Port, () => {
  console.log('🚀 Back-end Truck Monitor started', +Port)
})

