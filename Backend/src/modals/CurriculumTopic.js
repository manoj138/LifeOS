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
    type: DataTypes.STRING,
    defaultValue: 'Beginner',
  },
  order: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
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
  taskTitle: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  taskDescription: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  starterCode: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  solutionCriteria: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
}, {
  timestamps: true,
});

module.exports = CurriculumTopic;
