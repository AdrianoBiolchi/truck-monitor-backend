const express = require('express')
const routes = express.Router()

/**
 * Controllers
 */
const CompanyController = require('./app/controllers/CompanyController')


routes.get('/', (req, res) => {
  return res.send('O servidor está online agora.')
})

/**
 * Routes for Companies
 */

 routes.get('/companies', CompanyController.index)
 routes.get('/company/:id', CompanyController.show)
 routes.post('/company', CompanyController.store)

module.exports = routes