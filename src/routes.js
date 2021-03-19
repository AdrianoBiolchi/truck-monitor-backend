const express = require('express')
const routes = express.Router()

routes.get('/', (req, res) => {
  return res.send('O servidor está online agora.')
})

module.exports = routes