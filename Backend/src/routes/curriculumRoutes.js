const express = require('express');
const router = express.Router();
const {
  getAllTopics,
  getTopicById,
  updateTopic,
  seedCurriculum,
} = require('../controllers/curriculumController');

router.get('/topics', getAllTopics);
router.get('/topics/:id', getTopicById);
router.put('/topics/:id', updateTopic);
router.post('/seed', seedCurriculum);

module.exports = router;
