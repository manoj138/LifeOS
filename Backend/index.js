require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./src/config/sqliteDB');
const apiRoutes = require('./src/routes/apiRoutes');

// Ensure models are registered for sync
require('./src/modals/User');
require('./src/modals/UserPreference');
require('./src/modals/LearningProgress');

const app = express();
const port = process.env.PORT || 1235;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Mount API Routes
app.use('/api', apiRoutes);

app.get('/', (req, res) => {
  res.json({
    status: 'online',
    message: 'LifeOS Express & SQLite Backend Server is running.',
    database: 'SQLite (database.sqlite)',
    port: port,
  });
});

// Database Sync & Server Start
sequelize.sync({ alter: true })
  .then(() => {
    console.log('✅ SQLite Database Models synced successfully.');
    app.listen(port, () => {
      console.log(`🚀 LifeOS Backend Server listening on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error('❌ Failed to sync SQLite database models:', err.message);
  });

