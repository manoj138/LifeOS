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
require('./src/modals/PlannerTask');
require('./src/modals/Project');
require('./src/modals/CurriculumTopic');
require('./src/modals/RoadmapModule');
require('./src/modals/JobApplication');
require('./src/modals/InterviewQuestion');
require('./src/modals/DsaProblem');
require('./src/modals/DevopsStep');
require('./src/modals/EnglishModule');

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
  const missingCols = [
    { name: 'taskTitle', type: 'TEXT' },
    { name: 'taskDescription', type: 'TEXT' },
    { name: 'starterCode', type: 'TEXT' },
    { name: 'solutionCriteria', type: 'TEXT' },
    { name: '"order"', type: 'INTEGER DEFAULT 1' }
  ];
  for (const col of missingCols) {
    try {
      await sequelize.query(`ALTER TABLE CurriculumTopics ADD COLUMN ${col.name} ${col.type};`);
      console.log(`✅ Added missing column ${col.name} to CurriculumTopics table.`);
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

const ensureDsaColumns = async () => {
  try {
    await sequelize.query(`ALTER TABLE DsaProblems ADD COLUMN language TEXT DEFAULT 'javascript';`);
    console.log(`✅ Added missing column language to DsaProblems table.`);
  } catch (err) {
    // Ignore if column already exists
  }
};

const ensurePreferenceColumns = async () => {
  const textCols = [
    'cityState', 'aiLanguage', 'degree', 'collegeName', 'collegeCity', 'educationStatus',
    'currentSemester', 'graduationPeriod', 'hasExperience', 'experienceType', 'companyName',
    'experienceRole', 'experienceDuration', 'companyTechStack', 'project1Name', 'project1Tagline',
    'project1Desc', 'project1TechStack', 'project1Link', 'project2Name', 'project2Desc',
    'project2TechStack', 'leetcodeHandle', 'githubHandle', 'linkedinUrl', 'targetCompanyTier',
    'weakDsaTopics', 'weakDevopsTopics', 'preferredTimeSlot'
  ];
  for (const col of textCols) {
    try {
      await sequelize.query(`ALTER TABLE UserPreferences ADD COLUMN ${col} TEXT;`);
    } catch (err) {
      // Ignore if exists
    }
  }
  try {
    await sequelize.query(`ALTER TABLE UserPreferences ADD COLUMN onboardingCompleted INTEGER DEFAULT 0;`);
  } catch (err) {}
};

// Database Sync & Server Start
const { repairOutdatedTopics } = require('./src/scripts/repairOutdatedTopics');

const startServer = async () => {
  try {
    await sequelize.authenticate();
    await ensureTablesExist();
    await ensureModuleColumns();
    await ensureTopicColumns();
    await ensureDsaColumns();
    await ensurePreferenceColumns();
    await sequelize.sync();
    console.log('✅ SQLite Database Models synced successfully.');
    
    // Note: Background repair script available in src/scripts/repairOutdatedTopics.js if explicitly requested by admin
  } catch (err) {
    console.error('❌ Database sync notice:', err.message);
  }

  app.listen(port, () => {
    console.log(`🚀 LifeOS Backend Server listening on http://localhost:${port}`);
  });
};

startServer();


