// LifeOS Express & MongoDB Atlas Backend Entry Point
require('dotenv').config();
const path = require('path');
const express = require('express');
const cors = require('cors');
const connectDB = require('./src/config/db');
const apiRoutes = require('./src/routes/apiRoutes');

// Register Mongoose models
require('./src/modals/User');
require('./src/modals/UserPreference');
require('./src/modals/LearningProgress');
require('./src/modals/PlannerTask');
require('./src/modals/Project');
require('./src/modals/CurriculumTopic');
require('./src/modals/RoadmapModule');
require('./src/modals/InterviewQuestion');
require('./src/modals/DsaProblem');
require('./src/modals/EnglishModule');

const app = express();
const port = process.env.PORT || 1235;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static assets from public/dist folder
const distPath = path.join(__dirname, 'public', 'dist');
app.use(express.static(distPath));

// Mount API Routes
app.use('/api', apiRoutes);

// Health check endpoint
app.get('/api-health', (req, res) => {
  res.json({
    status: 'online',
    message: 'LifeOS Express & MongoDB Atlas Backend Server is running.',
    database: 'MongoDB Atlas Cloud',
    port: port,
  });
});

// Single Page Application (SPA) Fallback Route for Express 5.x
app.use((req, res, next) => {
  if (req.method === 'GET' && !req.path.startsWith('/api')) {
    res.sendFile(path.join(distPath, 'index.html'));
  } else {
    next();
  }
});

// Database Sync & Server Start
const startServer = async () => {
  try {
    await connectDB();
    console.log('✅ MongoDB Database Models synced successfully.');
  } catch (err) {
    console.error('❌ Database sync notice:', err.message);
  }

  app.listen(port, () => {
    console.log(`🚀 LifeOS Backend Server listening on http://localhost:${port}`);
  });
};

startServer();
