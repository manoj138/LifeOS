const express = require('express');
const router = express.Router();
const { getProjects, createProject } = require('../controllers/projectsController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', authMiddleware, getProjects);
router.post('/', authMiddleware, createProject);

module.exports = router;
