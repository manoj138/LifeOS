const express = require('express');
const router = express.Router();
const { getEntries, createEntry } = require('../controllers/journalController');

router.get('/entries', getEntries);
router.post('/entries', createEntry);

module.exports = router;
