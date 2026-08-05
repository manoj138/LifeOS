const express = require('express');
const router = express.Router();
const { getProblems, createProblem, deleteProblem, bulkGenerateSequence } = require('../controllers/dsaController');

router.get('/problems', getProblems);
router.post('/problems', createProblem);
router.delete('/problems/:id', deleteProblem);
router.post('/problems/bulk-generate-sequence', bulkGenerateSequence);

module.exports = router;
