const express = require('express');
const router = express.Router();
const {
  saveOnboarding,
  getPreferences,
  updatePreferences,
  resetOnboarding,
  getProfile,
  updateProfile,
} = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/profile', authMiddleware, getProfile);
router.put('/profile', authMiddleware, updateProfile);
router.post('/onboarding', authMiddleware, saveOnboarding);
router.get('/preferences', authMiddleware, getPreferences);
router.put('/preferences', authMiddleware, updatePreferences);
router.post('/reset-onboarding', authMiddleware, resetOnboarding);

module.exports = router;
