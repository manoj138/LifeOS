const express = require('express');
const router = express.Router();
const { getProgress, completeLesson, toggleSolvedDsa } = require('../controllers/learningController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/progress', authMiddleware, getProgress);
router.post('/complete-lesson', authMiddleware, completeLesson);
router.post('/toggle-dsa', authMiddleware, toggleSolvedDsa);

module.exports = router;
