const express = require('express');
const router = express.Router();
const { register, login, pinLogin, getMe } = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/register', register);
router.post('/login', login);
router.post('/pin-login', pinLogin);
router.get('/me', authMiddleware, getMe);

module.exports = router;
