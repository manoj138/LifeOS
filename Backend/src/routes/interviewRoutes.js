const express = require('express');
const router = express.Router();
const { getQuestions, createQuestion, deleteQuestion, bulkGenerateSequence } = require('../controllers/interviewController');
const { authMiddleware, adminMiddleware } = require('../middleware/authMiddleware');

router.get('/questions', getQuestions);
router.post('/questions', authMiddleware, adminMiddleware, createQuestion);
router.delete('/questions/:id', authMiddleware, adminMiddleware, deleteQuestion);
router.post('/questions/bulk-generate-sequence', authMiddleware, adminMiddleware, bulkGenerateSequence);

module.exports = router;
