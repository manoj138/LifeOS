const express = require('express');
const router = express.Router();
const { getAdminMetrics, getCandidates, deleteCandidate } = require('../controllers/adminController');
const { authMiddleware, adminMiddleware } = require('../middleware/authMiddleware');

router.get('/metrics', authMiddleware, adminMiddleware, getAdminMetrics);
router.get('/candidates', authMiddleware, adminMiddleware, getCandidates);
router.delete('/candidates/:id', authMiddleware, adminMiddleware, deleteCandidate);

module.exports = router;

