const { DataTypes } = require('sequelize');
const sequelize = require('../config/sqliteDB');

const DevopsStep = sequelize.define('DevopsStep', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  stepNumber: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  desc: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  command: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  category: {
    type: DataTypes.STRING,
    defaultValue: 'vps',
  },
}, {
  timestamps: true,
});

module.exports = DevopsStep;
