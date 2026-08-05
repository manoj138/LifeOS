const express = require('express');
const router = express.Router();
const { getSteps, createStep } = require('../controllers/devopsController');

router.get('/steps', getSteps);
router.post('/steps', createStep);

module.exports = router;
