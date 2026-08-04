const CurriculumTopic = require('../modals/CurriculumTopic');
const { sendSuccess, sendError } = require('../helper/responseHelper');
const { generateTopicContent } = require('../helper/aiGenerator');

const getAllTopics = async (req, res) => {
  try {
    const { moduleId } = req.query;
    const whereClause = moduleId ? { moduleId } : {};
    const topics = await CurriculumTopic.findAll({ where: whereClause, order: [['createdAt', 'ASC']] });
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
        projectApplication: req.body.projectApplication || '',
        quizQuestions: req.body.quizQuestions || [],
        taskTitle: req.body.taskTitle || '',
        taskDescription: req.body.taskDescription || '',
        starterCode: req.body.starterCode || '',
        solutionCriteria: req.body.solutionCriteria || '',
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

const generateSingleTopicWithAI = async (req, res) => {
  try {
    const { topicTitle, moduleId = 'js', level = 'Beginner' } = req.body;
    if (!topicTitle) {
      return sendError(res, 'topicTitle is required', null, 400);
    }

    const aiContent = await generateTopicContent(topicTitle, moduleId, level);
    return sendSuccess(res, 'Topic content generated via AI', aiContent);
  } catch (error) {
    return sendError(res, 'Error generating topic content via AI', error, 500);
  }
};

const bulkGenerateSequence = async (req, res) => {
  try {
    const { moduleId = 'js', level = 'Beginner', topicTitles = [] } = req.body;

    let titlesList = [];
    if (Array.isArray(topicTitles)) {
      titlesList = topicTitles.filter(t => typeof t === 'string' && t.trim().length > 0);
    } else if (typeof topicTitles === 'string') {
      titlesList = topicTitles.split('\n').map(t => t.replace(/^\d+[\.\)]\s*/, '').trim()).filter(Boolean);
    }

    if (titlesList.length === 0) {
      return sendError(res, 'No valid topic titles provided', null, 400);
    }

    const generatedTopics = [];
    const BATCH_SIZE = 4;

    for (let i = 0; i < titlesList.length; i += BATCH_SIZE) {
      const batchTitles = titlesList.slice(i, i + BATCH_SIZE);
      const batchResults = await Promise.all(
        batchTitles.map(async (title, idx) => {
          const globalIdx = i + idx;
          const topicId = `${moduleId}-${Date.now()}-${globalIdx}`;
          try {
            const content = await generateTopicContent(title, moduleId, level);
            return await CurriculumTopic.create({
              id: topicId,
              moduleId: moduleId,
              title: content.title || title,
              topicName: title,
              level: level,
              conceptExplanation: content.conceptExplanation || '',
              codeSnippet: content.codeSnippet || '',
              projectApplication: content.projectApplication || '',
              quizQuestions: content.quizQuestions || [],
              taskTitle: content.taskTitle || `Task: ${title}`,
              taskDescription: content.taskDescription || `Complete the practical coding exercise for ${title}`,
              starterCode: content.starterCode || `// Write your code for ${title}\n`,
              solutionCriteria: content.solutionCriteria || `Return valid result object.`,
            });
          } catch (err) {
            console.error(`Error generating topic ${title}:`, err);
            return null;
          }
        })
      );

      generatedTopics.push(...batchResults.filter(Boolean));
    }

    return sendSuccess(res, `Successfully generated ${generatedTopics.length} topics in sequence`, generatedTopics);
  } catch (error) {
    return sendError(res, 'Error generating curriculum sequence', error, 500);
  }
};

const deleteTopic = async (req, res) => {
  try {
    const { id } = req.params;
    const topic = await CurriculumTopic.findByPk(id);
    if (!topic) {
      return sendError(res, 'Topic not found', null, 404);
    }
    await topic.destroy();
    return sendSuccess(res, 'Topic deleted successfully', { id });
  } catch (error) {
    return sendError(res, 'Error deleting topic', error, 500);
  }
};

module.exports = {
  getAllTopics,
  getTopicById,
  updateTopic,
  generateSingleTopicWithAI,
  bulkGenerateSequence,
  deleteTopic,
};
