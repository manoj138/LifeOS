const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: process.env.SQLITE_STORAGE || './database.sqlite',
  logging: false,
  dialectOptions: {
    busyTimeout: 10000,
  },
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

sequelize.authenticate()
  .then(async () => {
    console.log('SQLite connection has been established successfully.');
    try {
      await sequelize.query('PRAGMA journal_mode = WAL;');
      await sequelize.query('PRAGMA busy_timeout = 10000;');
    } catch (e) {}
  })
  .catch((error) => {
    console.error('Unable to connect to the SQLite database:', error.message);
  });

module.exports = sequelize;
