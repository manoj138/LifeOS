const express = require('express');
const router = express.Router();
const { getGoals, createGoal } = require('../controllers/goalsController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', authMiddleware, getGoals);
router.post('/', authMiddleware, createGoal);

module.exports = router;
