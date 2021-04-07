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

      const { id } = req.params

      const company = await Company.findByPk(id, {
        attributes: [
          'id',
          'name',
          'cnpj',
          'ie',
          'city',
          'state',
          'address',
          'phone',
          'status',
          'password'
        ]
      })

      if(!company){
        return res.status(400).json({ message: "Empresa não encontrada."})
      }
     
      return res.status(200).json(company);
    } catch (err) {
      return res.status(500).json({ message: "Empresa não cadastrada!" });
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
      
      const { id } = req.params
      const company = await Company.findByPk(id)
      
      if(!company){
        return res.status(400).json({message: 'Essa empresa não existe.'})
      }

      if(req.body.cnpj){
        const cnpjExist = await Company.findOne({
          where : {
            cnpj : req.body.cnpj
          }
      })  
      
      if(cnpjExist && cnpjExist.cnpj !== company.cnpj){
         return res.status(400).json({message: "CNPJ já cadastrado para outra empresa!"})
      }
    }

      if (req.body.password && req.body.password !== null) {
          req.body.password = bcrypt.hashSync(req.body.password, saltRounds)
      }

      Company.update(
        Object.assign(req.body, {
          password: req.body.password ? req.body.password : undefined,
        }),
        {
          where: { id: id },
        }
      )
        .then((changed_data, rowsupdated) => {
          console.log(changed_data, rowsupdated)
        })
        .catch((error) => {
          console.log('error', error)
        })

        return res
        .status(200)
        .json({ message: 'Usuário atualizado com sucesso.' })

    } catch (error) {
      return res
        .status(500)
        .json({ message: 'Não foi possível atualizar o usuário.' })
    }
  }

  async destroy(req, res) {
    try {

      const { id } = req.params

      const company = await Company.findByPk(id);

      if(!company) {
        return res.status(400).json({message: "Essa empresa não existe!"})
      }

      company.update(Object.assign({status: "inactive"}),{
        where: {id:id}
      })

      await company.destroy();

      return res.status(200).json({message: "Empresa deletada com sucesso."});
    } catch (err) {
      return res.status(400).json({ message: "Empŕesa não pode ser deletada." });
    }
  }

  async login(req, res){

    const {cnpj, password} = req.body

    try {
      const company = await Company.findOne({
        where: {
          cnpj: req.body.cnpj
        }
      })

      if(!company){
        return res.status(400).json({
          message: "Essa empresa não existe."
        })
      }

      const isMatch = await bcrypt.compare(password, company.password)

      if (!isMatch)
        return res.status(400).json({
          message: 'Senha incorreta!',
        })

      const payload = {
        user: {
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

    } catch (error) {
      
    }

  }
}

module.exports = new CompanyController();