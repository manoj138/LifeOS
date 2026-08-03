const express = require('express');
const router = express.Router();
const { getHabits, checkinHabit } = require('../controllers/habitsController');

router.get('/', getHabits);
router.post('/:id/checkin', checkinHabit);

module.exports = router;
