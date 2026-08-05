const express = require('express');
const router = express.Router();
const { getQuestions, createQuestion } = require('../controllers/interviewController');

router.get('/questions', getQuestions);
router.post('/questions', createQuestion);

module.exports = router;
