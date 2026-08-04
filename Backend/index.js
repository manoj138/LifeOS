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
require('./src/modals/RoadmapModule');
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

// Helper: Safely add missing columns to SQLite table without altering entire database
const ensureTopicColumns = async () => {
  const missingCols = ['taskTitle', 'taskDescription', 'starterCode', 'solutionCriteria'];
  for (const colName of missingCols) {
    try {
      await sequelize.query(`ALTER TABLE CurriculumTopics ADD COLUMN ${colName} TEXT;`);
      console.log(`✅ Added missing column ${colName} to CurriculumTopics table.`);
    } catch (err) {
      // Ignore if column already exists
    }
  }
};

const ensureModuleColumns = async () => {
  const cols = [
    { name: 'title', def: 'TEXT' },
    { name: 'iconName', def: "TEXT DEFAULT 'Code2'" },
    { name: '"order"', def: 'INTEGER DEFAULT 1' },
    { name: 'description', def: 'TEXT' },
    { name: 'createdAt', def: 'DATETIME' },
    { name: 'updatedAt', def: 'DATETIME' }
  ];
  for (const col of cols) {
    try {
      await sequelize.query(`ALTER TABLE RoadmapModules ADD COLUMN ${col.name} ${col.def};`);
      console.log(`✅ Added missing column ${col.name} to RoadmapModules table.`);
    } catch (err) {
      // Ignore if column already exists
    }
  }
};

// Helper: Ensure missing SQLite tables exist reliably
const ensureTablesExist = async () => {
  for (let attempt = 1; attempt <= 5; attempt++) {
    try {
      await sequelize.query('PRAGMA busy_timeout = 30000;');
      await sequelize.query(`
        CREATE TABLE IF NOT EXISTS RoadmapModules (
          id TEXT PRIMARY KEY,
          title TEXT NOT NULL,
          iconName TEXT DEFAULT 'Code2',
          "order" INTEGER DEFAULT 1,
          description TEXT,
          createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
          updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
        );
      `);
      await sequelize.query(`
        CREATE TABLE IF NOT EXISTS CurriculumTopics (
          id TEXT PRIMARY KEY,
          moduleId TEXT,
          title TEXT NOT NULL,
          topicName TEXT,
          level TEXT DEFAULT 'Beginner',
          conceptExplanation TEXT,
          codeSnippet TEXT,
          projectApplication TEXT,
          quizQuestions TEXT,
          taskTitle TEXT,
          taskDescription TEXT,
          starterCode TEXT,
          solutionCriteria TEXT,
          createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
          updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
        );
      `);
      console.log('✅ Ensured RoadmapModules and CurriculumTopics tables exist.');
      return;
    } catch (err) {
      if (attempt === 5) {
        console.error('❌ Table creation notice:', err.message);
      } else {
        await new Promise(r => setTimeout(r, 500));
      }
    }
  }
};

// Database Sync & Server Start
const { repairOutdatedTopics } = require('./src/scripts/repairOutdatedTopics');

const startServer = async () => {
  try {
    await sequelize.authenticate();
    await ensureTablesExist();
    await ensureModuleColumns();
    await ensureTopicColumns();
    console.log('✅ SQLite Database Models synced successfully.');
    
    // Auto-repair any outdated AI topics in database.sqlite
    repairOutdatedTopics().catch(err => console.warn('Background repair notice:', err.message));
  } catch (err) {
    console.error('❌ Database sync notice:', err.message);
  }

  app.listen(port, () => {
    console.log(`🚀 LifeOS Backend Server listening on http://localhost:${port}`);
  });
};

startServer();


