// src/database/db.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('animes_db', 'root', null, {
  host: 'localhost',
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  // Remova a opção socketPath
  define: {
    timestamps: false,
  },
});

module.exports = sequelize;
