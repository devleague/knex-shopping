// Update with your config settings.

const dotenv = require("dotenv").config();

process.env.POSTGRES_DB;

module.exports = {
  client: "postgresql",
  connection: {
    database: process.env.POSTGRES_DB,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD
  },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: "knex_migrations"
  }
};
