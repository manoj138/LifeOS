const express = require('express');
const router = express.Router();
const { getEntries, createEntry } = require('../controllers/journalController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/entries', authMiddleware, getEntries);
router.post('/entries', authMiddleware, createEntry);

module.exports = router;
