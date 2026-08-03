const { DataTypes } = require('sequelize');
const sequelize = require('../config/sqliteDB');
const User = require('./User');

const HabitLog = sequelize.define('HabitLog', {
  id: {
    type: DataTypes.STRING,
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
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  streak: {
    type: DataTypes.INTEGER,
    defaultValue: 14,
  },
  completedToday: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  category: {
    type: DataTypes.STRING,
    defaultValue: 'Coding',
  },
}, {
  timestamps: true,
});

User.hasMany(HabitLog, { foreignKey: 'userId' });
HabitLog.belongsTo(User, { foreignKey: 'userId' });

module.exports = HabitLog;
