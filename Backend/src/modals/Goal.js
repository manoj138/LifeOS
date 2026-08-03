const { DataTypes } = require('sequelize');
const sequelize = require('../config/sqliteDB');
const User = require('./User');

const Goal = sequelize.define('Goal', {
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
  deadline: {
    type: DataTypes.STRING,
    defaultValue: 'Q4 2026',
  },
  category: {
    type: DataTypes.STRING,
    defaultValue: 'Career',
  },
  milestones: {
    type: DataTypes.JSON,
    defaultValue: [],
  },
}, {
  timestamps: true,
});

User.hasMany(Goal, { foreignKey: 'userId' });
Goal.belongsTo(User, { foreignKey: 'userId' });

module.exports = Goal;
