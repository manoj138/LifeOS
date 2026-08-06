const express = require('express');
const router = express.Router();
const { getFitnessLogs, updateFitnessLog } = require('../controllers/fitnessController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/logs', authMiddleware, getFitnessLogs);
router.put('/log', authMiddleware, updateFitnessLog);

module.exports = router;
