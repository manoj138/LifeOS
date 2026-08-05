const InterviewQuestion = require('../modals/InterviewQuestion');
const { sendSuccess, sendError } = require('../helper/responseHelper');

const getQuestions = async (req, res) => {
  try {
    const { category } = req.query;
    const where = category ? { category } : {};
    const questions = await InterviewQuestion.findAll({ where, order: [['createdAt', 'ASC']] });
    return sendSuccess(res, 'Interview questions fetched successfully', questions);
  } catch (error) {
    return sendError(res, 'Error fetching interview questions', error, 500);
  }
};

const createQuestion = async (req, res) => {
  try {
    const { category, question, answer, marathiIntent, difficulty } = req.body;
    const id = req.body.id || `iq-${Date.now()}`;
    const newQuestion = await InterviewQuestion.create({ id, category, question, answer, marathiIntent, difficulty });
    return sendSuccess(res, 'Interview question created successfully', newQuestion, 201);
  } catch (error) {
    return sendError(res, 'Error creating interview question', error, 500);
  }
};

const deleteQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    await InterviewQuestion.destroy({ where: { id } });
    return sendSuccess(res, 'Interview question deleted successfully', null);
  } catch (error) {
    return sendError(res, 'Error deleting interview question', error, 500);
  }
};

const { generateInterviewQuestionsBulk } = require('../helper/aiGenerator');

const bulkGenerateSequence = async (req, res) => {
  try {
    const { category, titles } = req.body;
    const generatedItems = generateInterviewQuestionsBulk(category || 'js', Array.isArray(titles) ? titles : []);
    
    // Deduplication safeguard: Fetch existing question texts
    const existing = await InterviewQuestion.findAll({ attributes: ['question'] });
    const existingSet = new Set(existing.map(e => (e.question || '').toLowerCase().trim()));

    // Filter only unique items
    const uniqueItems = generatedItems.filter(item => !existingSet.has((item.question || '').toLowerCase().trim()));

    if (uniqueItems.length === 0) {
      return sendSuccess(res, 'All questions in this bank already exist in your database', []);
    }

    const created = await InterviewQuestion.bulkCreate(uniqueItems);
    return sendSuccess(res, `Bulk generated ${created.length} unique interview questions`, created, 201);
  } catch (error) {
    return sendError(res, 'Error generating bulk interview questions', error, 500);
  }
};

module.exports = { getQuestions, createQuestion, deleteQuestion, bulkGenerateSequence };
