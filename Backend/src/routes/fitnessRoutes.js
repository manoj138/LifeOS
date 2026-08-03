const express = require('express');
const router = express.Router();
const { getFitnessLogs, updateFitnessLog } = require('../controllers/fitnessController');

router.get('/logs', getFitnessLogs);
router.put('/log', updateFitnessLog);

module.exports = router;
