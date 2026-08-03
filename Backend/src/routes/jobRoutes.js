const express = require('express');
const router = express.Router();
const { getJobApplications, createJobApplication } = require('../controllers/jobController');

router.get('/', getJobApplications);
router.post('/', createJobApplication);

module.exports = router;
