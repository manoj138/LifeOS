const express = require('express');
const router = express.Router();
const { getModules, createModule, deleteModule, bulkGenerateSequence } = require('../controllers/englishController');

router.get('/modules', getModules);
router.post('/modules', createModule);
router.delete('/modules/:id', deleteModule);
router.post('/modules/bulk-generate-sequence', bulkGenerateSequence);

module.exports = router;
