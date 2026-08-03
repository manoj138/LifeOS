const { DataTypes } = require('sequelize');
const sequelize = require('../config/sqliteDB');
const User = require('./User');

const UserPreference = sequelize.define('UserPreference', {
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
  targetRole: {
    type: DataTypes.STRING,
    defaultValue: 'Full-Stack Web Developer',
  },
  careerLevel: {
    type: DataTypes.STRING,
    defaultValue: 'Intermediate (1-3 yrs experience)',
  },
  focusAreas: {
    type: DataTypes.JSON,
    defaultValue: ['Coding & DSA', 'DevOps & Cloud', 'English Fluency', 'Fitness & Energy'],
  },
  skillLevels: {
    type: DataTypes.JSON,
    defaultValue: { dsa: 'Intermediate', devops: 'Beginner', english: 'Intermediate' },
  },
  dailyHours: {
    type: DataTypes.INTEGER,
    defaultValue: 4,
  },
  targetDate: {
    type: DataTypes.STRING,
    defaultValue: '2026-12-31',
  },
  fitnessGoal: {
    type: DataTypes.STRING,
    defaultValue: 'Build Muscle & Increase Energy',
  },
  workoutType: {
    type: DataTypes.STRING,
    defaultValue: 'Gym Weightlifting & Strength',
  },
  aiPersona: {
    type: DataTypes.STRING,
    defaultValue: 'Motivational Tech Mentor',
  },
  onboardingCompleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
}, {
  timestamps: true,
});

User.hasOne(UserPreference, { foreignKey: 'userId', as: 'preferences' });
UserPreference.belongsTo(User, { foreignKey: 'userId', as: 'user' });

module.exports = UserPreference;
