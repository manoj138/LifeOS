const express = require('express');
const router = express.Router();
const { getJobApplications, createJobApplication } = require('../controllers/jobController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', authMiddleware, getJobApplications);
router.post('/', authMiddleware, createJobApplication);

module.exports = router;
