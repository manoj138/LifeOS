const { DataTypes } = require('sequelize');
const sequelize = require('../config/sqliteDB');

const DsaProblem = sequelize.define('DsaProblem', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  difficulty: {
    type: DataTypes.STRING, // 'Easy', 'Medium', 'Hard'
    defaultValue: 'Medium',
  },
  topic: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  timeLimit: {
    type: DataTypes.STRING,
    defaultValue: 'O(N)',
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  hint: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  starterCode: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  solutionCode: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
}, {
  timestamps: true,
});

module.exports = DsaProblem;
