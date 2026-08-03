const { DataTypes } = require('sequelize');
const sequelize = require('../config/sqliteDB');
const User = require('./User');

const JournalEntry = sequelize.define('JournalEntry', {
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
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  mood: {
    type: DataTypes.INTEGER,
    defaultValue: 9,
  },
  promptUsed: {
    type: DataTypes.STRING,
    defaultValue: 'What major technical breakthrough did you achieve today?',
  },
  date: {
    type: DataTypes.STRING,
    defaultValue: () => new Date().toISOString().split('T')[0],
  },
}, {
  timestamps: true,
});

User.hasMany(JournalEntry, { foreignKey: 'userId' });
JournalEntry.belongsTo(User, { foreignKey: 'userId' });

module.exports = JournalEntry;
