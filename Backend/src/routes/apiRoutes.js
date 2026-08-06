const express = require('express');
const router = express.Router();

const authRoutes = require('./authRoutes');
const userRoutes = require('./userRoutes');
const plannerRoutes = require('./plannerRoutes');
const learningRoutes = require('./learningRoutes');
const projectsRoutes = require('./projectsRoutes');
const adminRoutes = require('./adminRoutes');
const curriculumRoutes = require('./curriculumRoutes');
const jobRoutes = require('./jobRoutes');
const interviewRoutes = require('./interviewRoutes');
const dsaRoutes = require('./dsaRoutes');
const devopsRoutes = require('./devopsRoutes');
const englishRoutes = require('./englishRoutes');

router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/planner', plannerRoutes);
router.use('/learning', learningRoutes);
router.use('/projects', projectsRoutes);
router.use('/admin', adminRoutes);
router.use('/curriculum', curriculumRoutes);
router.use('/jobs', jobRoutes);
router.use('/interview', interviewRoutes);
router.use('/dsa', dsaRoutes);
router.use('/devops', devopsRoutes);
router.use('/english', englishRoutes);



module.exports = router;
