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
    const { topicTitle, topicId, moduleId = 'js', level = 'Beginner', saveToDb = false } = req.body;
    if (!topicTitle && !topicId) {
      return sendError(res, 'topicTitle or topicId is required', null, 400);
    }

    let existingTopic = null;
    if (topicId) {
      existingTopic = await CurriculumTopic.findByPk(topicId);
    }

    // Strictly prioritize topicTitle typed in the input box if provided by user
    const titleToGenerate = (topicTitle && typeof topicTitle === 'string' && topicTitle.trim().length > 0)
      ? topicTitle.trim()
      : (existingTopic ? (existingTopic.topicName || existingTopic.title) : null);

    if (!titleToGenerate) {
      return sendError(res, 'Could not determine topic title', null, 400);
    }

    const content = await generateTopicContent(titleToGenerate, moduleId, level);

    if (saveToDb || existingTopic) {
      const payload = {
        moduleId: moduleId,
        title: content.title || titleToGenerate,
        topicName: titleToGenerate,
        level: level,
        conceptExplanation: content.conceptExplanation || '',
        codeSnippet: content.codeSnippet || '',
        projectApplication: content.projectApplication || '',
        quizQuestions: content.quizQuestions || [],
        taskTitle: content.taskTitle || `Task: ${titleToGenerate}`,
        taskDescription: content.taskDescription || `Complete the practical coding exercise for ${titleToGenerate}`,
        starterCode: content.starterCode || `// Write your code for ${titleToGenerate}\n`,
        solutionCriteria: content.solutionCriteria || `Return valid result object.`,
      };

      if (existingTopic) {
        await existingTopic.update(payload);
        return sendSuccess(res, 'Topic re-generated & updated in database', existingTopic);
      } else {
        const newId = `${moduleId}-${Date.now()}`;
        const newTopic = await CurriculumTopic.create({ id: newId, ...payload });
        return sendSuccess(res, 'Topic generated & created in database', newTopic);
      }
    }

    return sendSuccess(res, 'Topic content generated via AI', content);
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

            // Upsert: Check if topic already exists for this module & title
            let existingTopic = await CurriculumTopic.findOne({
              where: { moduleId: moduleId, topicName: title }
            });
            if (!existingTopic) {
              existingTopic = await CurriculumTopic.findOne({
                where: { moduleId: moduleId, title: title }
              });
            }

            const payload = {
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
            };

            if (existingTopic) {
              await existingTopic.update(payload);
              return existingTopic;
            } else {
              return await CurriculumTopic.create({
                id: topicId,
                ...payload
              });
            }
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

const repairAllOutdatedTopics = async (req, res) => {
  try {
    const { repairOutdatedTopics } = require('../scripts/repairOutdatedTopics');
    const count = await repairOutdatedTopics();
    return sendSuccess(res, `Successfully scanned and repaired ${count} outdated topics`, { count });
  } catch (error) {
    return sendError(res, 'Error repairing outdated topics', error, 500);
  }
};

module.exports = {
  getAllTopics,
  getTopicById,
  updateTopic,
  generateSingleTopicWithAI,
  bulkGenerateSequence,
  deleteTopic,
  repairAllOutdatedTopics,
};
