const {Client} = require('pg');
const { DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE, DB_PORT, } = require('../config/config');

const client = new Client({
  post : process.env.DB_PORT,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});
client.connect()

module.exports = client;
