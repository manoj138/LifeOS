const { DataTypes } = require('sequelize');
const sequelize = require('../config/sqliteDB');

const CurriculumTopic = sequelize.define('CurriculumTopic', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  moduleId: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'js',
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  topicName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  level: {
    type: DataTypes.ENUM('Beginner', 'Intermediate', 'Advanced'),
    defaultValue: 'Beginner',
  },
  conceptExplanation: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  codeSnippet: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  projectApplication: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  quizQuestions: {
    type: DataTypes.JSON,
    defaultValue: [],
  },
}, {
  timestamps: true,
});

module.exports = CurriculumTopic;
