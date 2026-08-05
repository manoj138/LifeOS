const { DataTypes } = require('sequelize');
const sequelize = require('../config/sqliteDB');

const EnglishModule = sequelize.define('EnglishModule', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  category: {
    type: DataTypes.STRING, // 'pronunciation', 'vocabulary', 'scenario'
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  badgeLabel: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  badgeColor: {
    type: DataTypes.STRING,
    defaultValue: 'emerald',
  },
}, {
  timestamps: true,
});

module.exports = EnglishModule;
