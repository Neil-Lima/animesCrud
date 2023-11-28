const { DataTypes } = require('sequelize');
const sequelize = require('../database/db');

const Anime = sequelize.define('Anime', {
  titulo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  imagem: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  criador: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ano: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  categoria: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'animes_tb', 
});

module.exports = Anime;
