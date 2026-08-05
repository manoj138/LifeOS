const { DataTypes } = require('sequelize');
const sequelize = require('../config/sqliteDB');

const InterviewQuestion = sequelize.define('InterviewQuestion', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  category: {
    type: DataTypes.STRING, // 'js', 'react', 'node', 'system-design', 'hr'
    allowNull: false,
    defaultValue: 'js',
  },
  question: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  answer: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  marathiIntent: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  difficulty: {
    type: DataTypes.STRING, // 'Beginner', 'Intermediate', 'Advanced'
    defaultValue: 'Beginner',
  },
}, {
  timestamps: true,
});

module.exports = InterviewQuestion;
