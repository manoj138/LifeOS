const express = require('express');
const router = express.Router();
const { getProblems, createProblem } = require('../controllers/dsaController');

router.get('/problems', getProblems);
router.post('/problems', createProblem);

module.exports = router;
