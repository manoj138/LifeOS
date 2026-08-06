const express = require('express');
const router = express.Router();
const { getHabits, checkinHabit } = require('../controllers/habitsController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', authMiddleware, getHabits);
router.post('/:id/checkin', authMiddleware, checkinHabit);

module.exports = router;
