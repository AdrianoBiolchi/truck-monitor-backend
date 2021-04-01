'use strict';

const { v4 } = require('uuid')
const bcrypt = require('bcrypt')
const saltRounds = 10

module.exports = {
  up: async (queryInterface, Sequelize) => {
   await queryInterface.bulkInsert('companies', [{
      id: v4(),
      name: "Empresa Teste",
      cnpj:"38.168.769/0001-96",
      ie: "1350001/01",
      city:"Serafina Corrêa",
      state:"RS",
      address:"Rua Barreto Viana, 1485",
      phone:"54 9 9939-2951",
      password: bcrypt.hashSync('teste', saltRounds),
      status: 'active',
      created_at: new Date(),
      updated_at: new Date(),
     }], {});
    
  },

  down: async (queryInterface, Sequelize) => {

   await queryInterface.bulkDelete('companies', null, {});
     
  }
};
