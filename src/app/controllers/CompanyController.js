const { Company } = require('../models');

//chama bcrypt para gerar um hash para senha
const bcrypt = require('bcrypt')
const saltRounds = 10

// chama jwt para gerar um token de acesso
const jwt = require('jsonwebtoken')

class CompanyController {
  async index(req, res) {
    try {
      const companies = await Company.findAndCountAll({
        attributes: {
          exclude: ['password']
      }
      })
      
      return res.status(200).json(companies)
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  async show(req, res) {
    try {
      const company = await Company.findByPk(req.params.id);

      return res.json(company);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  async store(req, res) {
    const hash = bcrypt.hashSync(req.body.password, saltRounds)
    const {name, cnpj, ie, city, state, address, phone, password } = req.body
    try {
      //Testa se CNPJ já esta cadastrdo
      const cnpjExist = await Company.findOne({
        where: { 
          cnpj
        }
      })
      
      if(cnpjExist)
        return res.status(400).json({ message: 'CNPJ já cadastrado!' })
     
      let company = await Company.create(Object.assign(req.body, { password: hash }))

      const payload = {
        admin: {
          id: company.id,
        },
      }

      const id = company.id
      jwt.sign(payload, process.env.JWT_KEY, (err, token) => {
        if (err) throw err
        res.status(200).json({
          token,
          id,
        })
      })    
    } catch (err) {
      return res.status(400).json({ error: "err.message" });
    }
  }

  async update(req, res) {
    try {
      const company = await Company.findByPk(req.params.id);

      await company.update(req.body);

      return res.json({ company });
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  async destroy(req, res) {
    try {
      const company = await Company.findByPk(req.params.id);

      await company.destroy();

      return res.json();
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }
}

module.exports = new CompanyController();