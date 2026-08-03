const express = require('express');
const router = express.Router();
const { getAdminMetrics, getCandidates, deleteCandidate } = require('../controllers/adminController');

router.get('/metrics', getAdminMetrics);
router.get('/candidates', getCandidates);
router.delete('/candidates/:id', deleteCandidate);

module.exports = router;

