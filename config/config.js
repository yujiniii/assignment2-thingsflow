require('dotenv').config();

const development = {
    username: 'root',
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
    host: process.env.HOST,
    dialect:'mysql',
    operatorAliases : false
  }

  module.exports = development;