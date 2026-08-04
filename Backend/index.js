// LifeOS Express & SQLite Backend Entry Point - Updated 2026-08-03 (Refreshed)
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./src/config/sqliteDB');
const apiRoutes = require('./src/routes/apiRoutes');

// Ensure models are registered for sync
require('./src/modals/User');
require('./src/modals/UserPreference');
require('./src/modals/LearningProgress');
require('./src/modals/Goal');
require('./src/modals/PlannerTask');
require('./src/modals/Project');
require('./src/modals/FitnessLog');
require('./src/modals/HabitLog');
require('./src/modals/JournalEntry');
require('./src/modals/CurriculumTopic');
require('./src/modals/JobApplication');




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
const startServer = async () => {
  try {
    await sequelize.sync();
    console.log('✅ SQLite Database Models synced successfully.');
  } catch (err) {
    console.error('❌ Database sync notice:', err.message);
  }

  app.listen(port, () => {
    console.log(`🚀 LifeOS Backend Server listening on http://localhost:${port}`);
  });
};

startServer();


