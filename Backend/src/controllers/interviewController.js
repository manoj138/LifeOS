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

module.exports = { getQuestions, createQuestion };
