const express = require('express');
const router = express.Router();
const { getSteps, createStep, deleteStep, bulkGenerateSequence } = require('../controllers/devopsController');

router.get('/steps', getSteps);
router.post('/steps', createStep);
router.delete('/steps/:id', deleteStep);
router.post('/steps/bulk-generate-sequence', bulkGenerateSequence);

module.exports = router;
