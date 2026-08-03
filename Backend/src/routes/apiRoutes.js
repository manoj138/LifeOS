const express = require('express');
const router = express.Router();

const authRoutes = require('./authRoutes');
const userRoutes = require('./userRoutes');
const learningRoutes = require('./learningRoutes');
const adminRoutes = require('./adminRoutes');

router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/learning', learningRoutes);
router.use('/admin', adminRoutes);

module.exports = router;
