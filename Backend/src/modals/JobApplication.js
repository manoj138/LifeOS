const { DataTypes } = require('sequelize');
const sequelize = require('../config/sqliteDB');
const User = require('./User');

const JobApplication = sequelize.define('JobApplication', {
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
  company: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('Applied', 'Interviewing', 'Offer', 'Rejected'),
    defaultValue: 'Applied',
  },
  salary: {
    type: DataTypes.STRING,
    defaultValue: '$180k - $220k',
  },
  location: {
    type: DataTypes.STRING,
    defaultValue: 'Remote / US & India',
  },
  appliedDate: {
    type: DataTypes.STRING,
    defaultValue: () => new Date().toISOString().split('T')[0],
  },
}, {
  timestamps: true,
});

User.hasMany(JobApplication, { foreignKey: 'userId' });
JobApplication.belongsTo(User, { foreignKey: 'userId' });

module.exports = JobApplication;
