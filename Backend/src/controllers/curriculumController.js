const CurriculumTopic = require('../modals/CurriculumTopic');
const { sendSuccess, sendError } = require('../helper/responseHelper');
const { generateTopicContent } = require('../helper/aiGenerator');

const sortTopicsNaturally = (topics) => {
  return [...topics].sort((a, b) => {
    // 1. Explicit admin order (1, 2, 3...)
    const orderA = Number.isInteger(a.order) ? a.order : 999;
    const orderB = Number.isInteger(b.order) ? b.order : 999;
    if (orderA !== orderB) return orderA - orderB;

    // 2. Numeric title prefix if present in both
    const getNum = (item) => {
      const text = `${item.title || ''} ${item.topicName || ''}`.trim();
      const match = text.match(/^(\d+)[\.\)]/);
      if (match) return parseInt(match[1], 10);
      return null;
    };

    const numA = getNum(a);
    const numB = getNum(b);
    if (numA !== null && numB !== null && numA !== numB) {
      return numA - numB;
    }

    // 3. Exact admin creation sequence
    return new Date(a.createdAt || 0) - new Date(b.createdAt || 0);
  });
};

const getAllTopics = async (req, res) => {
  try {
    const { moduleId } = req.query;
    const whereClause = moduleId ? { moduleId } : {};
    const topics = await CurriculumTopic.findAll({ where: whereClause, order: [['order', 'ASC'], ['createdAt', 'ASC']] });
    const sorted = sortTopicsNaturally(topics);
    return sendSuccess(res, 'Curriculum topics retrieved successfully', sorted);
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
        order: req.body.order || 1,
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
      titlesList = topicTitles.split('\n').map(t => t.trim()).filter(Boolean);
    }

    if (titlesList.length === 0) {
      return sendError(res, 'No valid topic titles provided', null, 400);
    }

    // Determine current max order in DB for this moduleId
    const existingTopics = await CurriculumTopic.findAll({ where: { moduleId } });
    const maxOrder = existingTopics.reduce((max, t) => Math.max(max, t.order || 0), 0);

    const generatedTopics = [];
    const BATCH_SIZE = 4;

    for (let i = 0; i < titlesList.length; i += BATCH_SIZE) {
      const batchTitles = titlesList.slice(i, i + BATCH_SIZE);
      const batchResults = await Promise.all(
        batchTitles.map(async (rawTitle, idx) => {
          const globalIdx = i + idx;
          const cleanTitle = rawTitle.replace(/^\d+[\.\)]\s*/, '').trim();

          let existingTopic = await CurriculumTopic.findOne({
            where: { moduleId: moduleId, topicName: cleanTitle }
          });

          const targetOrder = existingTopic?.order || (maxOrder + globalIdx + 1);
          const numberedTitle = `${targetOrder}. ${cleanTitle}`;
          const topicId = `${moduleId}-${Date.now()}-${globalIdx}`;

          try {
            const content = await generateTopicContent(cleanTitle, moduleId, level);

            const payload = {
              moduleId: moduleId,
              title: numberedTitle,
              topicName: cleanTitle,
              level: level,
              order: targetOrder,
              conceptExplanation: content.conceptExplanation || '',
              codeSnippet: content.codeSnippet || '',
              projectApplication: content.projectApplication || '',
              quizQuestions: content.quizQuestions || [],
              taskTitle: content.taskTitle || `Task: ${cleanTitle}`,
              taskDescription: content.taskDescription || `Complete the practical coding exercise for ${cleanTitle}`,
              starterCode: content.starterCode || `// Write your code for ${cleanTitle}\n`,
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
            console.error(`Error generating topic ${rawTitle}:`, err);
            return null;
          }
        })
      );

      generatedTopics.push(...batchResults.filter(Boolean));
    }

    // Auto re-index all topics in this module sequentially 1..N
    const allTopics = await CurriculumTopic.findAll({ where: { moduleId } });
    const sortedAll = sortTopicsNaturally(allTopics);

    for (let k = 0; k < sortedAll.length; k++) {
      const t = sortedAll[k];
      const cTitle = (t.topicName || t.title || '').replace(/^\d+[\.\)]\s*/, '').trim();
      await t.update({
        order: k + 1,
        title: `${k + 1}. ${cTitle}`,
        topicName: cTitle
      });
    }

    const finalTopics = await CurriculumTopic.findAll({ where: { moduleId }, order: [['order', 'ASC']] });
    return sendSuccess(res, `Successfully generated ${generatedTopics.length} topics in sequence`, finalTopics);
  } catch (error) {
    return sendError(res, 'Error generating curriculum sequence', error, 500);
  }
};

const reorderTopicsSequentially = async (req, res) => {
  try {
    const { moduleId } = req.body;
    if (!moduleId) {
      return sendError(res, 'moduleId is required', null, 400);
    }
    const topics = await CurriculumTopic.findAll({ where: { moduleId } });
    const sorted = sortTopicsNaturally(topics);

    for (let i = 0; i < sorted.length; i++) {
      const topic = sorted[i];
      const rawTitle = topic.title || topic.topicName || '';
      const cleanTitle = rawTitle.replace(/^\d+[\.\)]\s*/, '').trim();
      const numberedTitle = `${i + 1}. ${cleanTitle}`;
      await topic.update({
        order: i + 1,
        title: numberedTitle,
        topicName: cleanTitle
      });
    }

    const updatedTopics = await CurriculumTopic.findAll({ where: { moduleId }, order: [['order', 'ASC']] });
    return sendSuccess(res, `Successfully re-indexed ${updatedTopics.length} topics sequentially`, updatedTopics);
  } catch (error) {
    return sendError(res, 'Error re-ordering curriculum topics', error, 500);
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
  reorderTopicsSequentially,
  deleteTopic,
  repairAllOutdatedTopics,
};
