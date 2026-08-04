const { Sequelize } = require('sequelize');
const path = require('path');

const storagePath = process.env.SQLITE_STORAGE || path.resolve(__dirname, '../../database.sqlite');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: storagePath,
  logging: false,
  dialectOptions: {
    busyTimeout: 30000,
  },
  pool: {
    max: 1,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

sequelize.authenticate()
  .then(async () => {
    try {
      await sequelize.query('PRAGMA journal_mode = WAL;');
      await sequelize.query('PRAGMA busy_timeout = 30000;');
    } catch (e) {}
  })
  .catch((error) => {
    console.error('Unable to connect to the SQLite database:', error.message);
  });

module.exports = sequelize;
