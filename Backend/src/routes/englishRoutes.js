const express = require('express');
const router = express.Router();
const { getModules, createModule } = require('../controllers/englishController');

router.get('/modules', getModules);
router.post('/modules', createModule);

module.exports = router;
