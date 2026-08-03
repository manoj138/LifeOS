const express = require('express');
const router = express.Router();
const {
  saveOnboarding,
  getPreferences,
  updatePreferences,
  resetOnboarding,
} = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/onboarding', authMiddleware, saveOnboarding);
router.get('/preferences', authMiddleware, getPreferences);
router.put('/preferences', authMiddleware, updatePreferences);
router.post('/reset-onboarding', authMiddleware, resetOnboarding);

module.exports = router;
