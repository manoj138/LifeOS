const { DataTypes } = require('sequelize');
const sequelize = require('../config/sqliteDB');
const User = require('./User');

const PlannerTask = sequelize.define('PlannerTask', {
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
  start: {
    type: DataTypes.STRING,
    defaultValue: '09:00 AM',
  },
  end: {
    type: DataTypes.STRING,
    defaultValue: '10:00 AM',
  },
  category: {
    type: DataTypes.STRING,
    defaultValue: 'Deep Work',
  },
  energy: {
    type: DataTypes.STRING,
    defaultValue: 'High',
  },
  completed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  date: {
    type: DataTypes.STRING,
    defaultValue: () => new Date().toISOString().split('T')[0],
  },
}, {
  timestamps: true,
});

User.hasMany(PlannerTask, { foreignKey: 'userId' });
PlannerTask.belongsTo(User, { foreignKey: 'userId' });

module.exports = PlannerTask;
