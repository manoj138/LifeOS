const CurriculumTopic = require('../modals/CurriculumTopic');
const { sendSuccess, sendError } = require('../helper/responseHelper');

const getAllTopics = async (req, res) => {
  try {
    const { moduleId } = req.query;
    const whereClause = moduleId ? { moduleId } : {};
    const topics = await CurriculumTopic.findAll({ where: whereClause });
    return sendSuccess(res, 'Curriculum topics retrieved successfully', topics);
  } catch (error) {
    return sendError(res, 'Error fetching curriculum topics', error, 500);
  }
};

const getTopicById = async (req, res) => {
  try {
    const { id } = req.params;
    const topic = await CurriculumTopic.findByPk(id);
    if (!topic) {
      return sendError(res, 'Topic not found', null, 404);
    }
    return sendSuccess(res, 'Topic retrieved successfully', topic);
  } catch (error) {
    return sendError(res, 'Error retrieving topic', error, 500);
  }
};

const updateTopic = async (req, res) => {
  try {
    const { id } = req.params;
    let topic = await CurriculumTopic.findByPk(id);

    if (!topic) {
      // Auto-create if new topic
      topic = await CurriculumTopic.create({
        id,
        moduleId: req.body.moduleId || 'js',
        title: req.body.title || id,
        topicName: req.body.topicName || id,
        conceptExplanation: req.body.conceptExplanation || '',
        codeSnippet: req.body.codeSnippet || '',
        level: req.body.level || 'Beginner',
      });
    } else {
      await topic.update(req.body);
    }

    return sendSuccess(res, 'Curriculum topic updated successfully', topic);
  } catch (error) {
    return sendError(res, 'Error updating curriculum topic', error, 500);
  }
};

const smartCurriculumSeeder = require('../helper/smartCurriculumSeeder');

const seedCurriculum = async (req, res) => {
  try {
    const summary = await smartCurriculumSeeder();
    return sendSuccess(res, 'Smart curriculum seeding complete', summary);
  } catch (error) {
    return sendError(res, 'Error seeding curriculum database', error, 500);
  }
};


module.exports = {
  getAllTopics,
  getTopicById,
  updateTopic,
  seedCurriculum,
};
