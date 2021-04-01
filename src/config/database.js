require('dotenv').config() // magic

module.exports = {
  
  dialect: process.env.DIALECT,
  host: process.env.DB_HOST,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,

  define: {
    timestamps: true,
    underscored: true,
  },
  logging: false,
}