const { DataTypes } = require('sequelize');
const sequelize = require('../config/sqliteDB');
const User = require('./User');

const FitnessLog = sequelize.define('FitnessLog', {
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
  caloriesBurned: {
    type: DataTypes.INTEGER,
    defaultValue: 680,
  },
  waterIntakeLiters: {
    type: DataTypes.FLOAT,
    defaultValue: 2.8,
  },
  sleepHours: {
    type: DataTypes.FLOAT,
    defaultValue: 7.8,
  },
  recoveryScore: {
    type: DataTypes.INTEGER,
    defaultValue: 92,
  },
  workoutSession: {
    type: DataTypes.STRING,
    defaultValue: 'Gym Weightlifting & Strength',
  },
  date: {
    type: DataTypes.STRING,
    defaultValue: () => new Date().toISOString().split('T')[0],
  },
}, {
  timestamps: true,
});

User.hasMany(FitnessLog, { foreignKey: 'userId' });
FitnessLog.belongsTo(User, { foreignKey: 'userId' });

module.exports = FitnessLog;
