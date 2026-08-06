const express = require('express');
const router = express.Router();
const { getProblems, createProblem, deleteProblem, bulkGenerateSequence, bulkImportRawDsa, deleteProblemsByLanguage } = require('../controllers/dsaController');

router.get('/problems', getProblems);
router.post('/problems', createProblem);
router.delete('/problems/:id', deleteProblem);
router.delete('/problems/language/:language', deleteProblemsByLanguage);
router.post('/problems/bulk-generate-sequence', bulkGenerateSequence);
router.post('/problems/bulk-raw-import', bulkImportRawDsa);

module.exports = router;
