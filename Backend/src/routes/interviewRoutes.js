const express = require('express');
const router = express.Router();
const { getQuestions, createQuestion, deleteQuestion, bulkGenerateSequence } = require('../controllers/interviewController');

router.get('/questions', getQuestions);
router.post('/questions', createQuestion);
router.delete('/questions/:id', deleteQuestion);
router.post('/questions/bulk-generate-sequence', bulkGenerateSequence);

module.exports = router;
