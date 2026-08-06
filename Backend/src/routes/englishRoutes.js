const express = require('express');
const router = express.Router();
const { getModules, createModule, deleteModule, bulkGenerateSequence } = require('../controllers/englishController');
const { authMiddleware, adminMiddleware } = require('../middleware/authMiddleware');

router.get('/modules', getModules);
router.post('/modules', authMiddleware, adminMiddleware, createModule);
router.delete('/modules/:id', authMiddleware, adminMiddleware, deleteModule);
router.post('/modules/bulk-generate-sequence', authMiddleware, adminMiddleware, bulkGenerateSequence);

module.exports = router;
