const express = require('express');
const router = express.Router();
const { getAdminMetrics, getCandidates } = require('../controllers/adminController');

router.get('/metrics', getAdminMetrics);
router.get('/candidates', getCandidates);

module.exports = router;
