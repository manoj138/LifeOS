const express = require('express');
const router = express.Router();
const {
  getAllTopics,
  getTopicById,
  updateTopic,
  generateSingleTopicWithAI,
  bulkGenerateSequence,
  deleteTopic,
} = require('../controllers/curriculumController');

router.get('/topics', getAllTopics);
router.get('/topics/:id', getTopicById);
router.put('/topics/:id', updateTopic);
router.post('/topics/generate-ai', generateSingleTopicWithAI);
router.post('/topics/bulk-generate-sequence', bulkGenerateSequence);
router.delete('/topics/:id', deleteTopic);

module.exports = router;
