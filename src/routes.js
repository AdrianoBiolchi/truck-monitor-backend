const express = require('express')
const routes = express.Router()

routes.get('/', (req, res) => {
  return res.send('The server Truck Monitor is only.')
})

module.exports = routes