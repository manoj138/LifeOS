const { DataTypes } = require('sequelize');
const sequelize = require('../config/sqliteDB');
const User = require('./User');

const LearningProgress = sequelize.define('LearningProgress', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
  },
  lastActiveModule: {
    type: DataTypes.STRING,
    defaultValue: 'js',
  },
  completedLessons: {
    type: DataTypes.JSON,
    defaultValue: ['js-0'],
  },
  solvedDsaProblems: {
    type: DataTypes.JSON,
    defaultValue: [],
  },
  passedQuizzes: {
    type: DataTypes.JSON,
    defaultValue: {},
  },
}, {
  timestamps: true,
});

User.hasOne(LearningProgress, { foreignKey: 'userId', as: 'learningProgress' });
LearningProgress.belongsTo(User, { foreignKey: 'userId' });

module.exports = LearningProgress;
