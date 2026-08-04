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

const {
  getAllModules,
  createModule,
  updateModule,
  deleteModule,
} = require('../controllers/moduleController');

// Module Routes
router.get('/modules', getAllModules);
router.post('/modules', createModule);
router.put('/modules/:id', updateModule);
router.delete('/modules/:id', deleteModule);

// Topic Routes
router.get('/topics', getAllTopics);
router.get('/topics/:id', getTopicById);
router.put('/topics/:id', updateTopic);
router.post('/topics/generate-ai', generateSingleTopicWithAI);
router.post('/topics/bulk-generate-sequence', bulkGenerateSequence);
router.delete('/topics/:id', deleteTopic);

module.exports = router;
