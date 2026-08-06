const express = require('express');
const router = express.Router();
const { getSteps, createStep, deleteStep, bulkGenerateSequence } = require('../controllers/devopsController');
const { authMiddleware, adminMiddleware } = require('../middleware/authMiddleware');

router.get('/steps', getSteps);
router.post('/steps', authMiddleware, adminMiddleware, createStep);
router.delete('/steps/:id', authMiddleware, adminMiddleware, deleteStep);
router.post('/steps/bulk-generate-sequence', authMiddleware, adminMiddleware, bulkGenerateSequence);

module.exports = router;
