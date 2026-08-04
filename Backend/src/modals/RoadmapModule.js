const { DataTypes } = require('sequelize');
const sequelize = require('../config/sqliteDB');

const RoadmapModule = sequelize.define('RoadmapModule', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  iconName: {
    type: DataTypes.STRING,
    defaultValue: 'Code2',
  },
  order: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
}, {
  timestamps: true,
});

module.exports = RoadmapModule;
