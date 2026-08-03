const { DataTypes } = require('sequelize');
const sequelize = require('../config/sqliteDB');
const User = require('./User');

const Project = sequelize.define('Project', {
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
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'In Progress',
  },
  techStack: {
    type: DataTypes.JSON,
    defaultValue: ['React', 'Node.js', 'Express', 'SQLite'],
  },
  kanbanTasks: {
    type: DataTypes.JSON,
    defaultValue: [
      { id: 'k1', title: 'Setup Authentication & JWT', column: 'done' },
      { id: 'k2', title: 'Design RESTful API Schema', column: 'inProgress' },
      { id: 'k3', title: 'Deploy Nginx & Docker VPS', column: 'todo' },
    ],
  },
}, {
  timestamps: true,
});

User.hasMany(Project, { foreignKey: 'userId' });
Project.belongsTo(User, { foreignKey: 'userId' });

module.exports = Project;
