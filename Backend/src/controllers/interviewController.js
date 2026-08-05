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
    if (!Array.isArray(titles) || titles.length === 0) {
      return sendError(res, 'Titles array is required', null, 400);
    }
    const generatedItems = generateInterviewQuestionsBulk(category || 'js', titles);
    const created = await InterviewQuestion.bulkCreate(generatedItems);
    return sendSuccess(res, 'Bulk interview questions generated successfully', created, 201);
  } catch (error) {
    return sendError(res, 'Error generating bulk interview questions', error, 500);
  }
};

module.exports = { getQuestions, createQuestion, deleteQuestion, bulkGenerateSequence };
