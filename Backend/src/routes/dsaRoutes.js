const express = require('express');
const router = express.Router();
const { getProblems, createProblem, deleteProblem, bulkGenerateSequence, bulkImportRawDsa, deleteProblemsByLanguage } = require('../controllers/dsaController');
const { authMiddleware, adminMiddleware } = require('../middleware/authMiddleware');

router.get('/problems', getProblems);
router.post('/problems', authMiddleware, adminMiddleware, createProblem);
router.delete('/problems/:id', authMiddleware, adminMiddleware, deleteProblem);
router.delete('/problems/language/:language', authMiddleware, adminMiddleware, deleteProblemsByLanguage);
router.post('/problems/bulk-generate-sequence', authMiddleware, adminMiddleware, bulkGenerateSequence);
router.post('/problems/bulk-raw-import', authMiddleware, adminMiddleware, bulkImportRawDsa);

module.exports = router;
