const InterviewQuestion = require('../modals/InterviewQuestion');
const { sendSuccess, sendError } = require('../helper/responseHelper');
const { generateInterviewQuestionsBulk } = require('../helper/aiGenerator');

const getQuestions = async (req, res) => {
  try {
    const { category } = req.query;
    const query = category ? { category } : {};
    const questions = await InterviewQuestion.find(query).sort({ createdAt: 1 });

    const cleanedQuestions = questions.map(q => {
      const plain = q.toObject ? q.toObject() : { ...q };
      if (plain.answer) {
        plain.answer = plain.answer.replace(/^(ns|Ans|Answer|A)\s*[:.-]?\s*/i, '').trim();
      }
      if (plain.question) {
        plain.question = plain.question.replace(/^(Question|Q\d*|\d+[\.\)])\s*[:.-]?\s*/i, '').trim();
      }
      return plain;
    });

    return sendSuccess(res, 'Interview questions fetched successfully', cleanedQuestions);
  } catch (error) {
    return sendError(res, 'Error fetching interview questions', error, 500);
  }
};

const createQuestion = async (req, res) => {
  try {
    const { category, question, answer, marathiIntent, difficulty } = req.body;
    const id = req.body.id || `iq-${Date.now()}`;
    const newQuestion = await InterviewQuestion.create({ _id: id, id, category, question, answer, marathiIntent, difficulty });
    return sendSuccess(res, 'Interview question created successfully', newQuestion, 201);
  } catch (error) {
    return sendError(res, 'Error creating interview question', error, 500);
  }
};

const deleteQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    await InterviewQuestion.deleteOne({ _id: id });
    return sendSuccess(res, 'Interview question deleted successfully', null);
  } catch (error) {
    return sendError(res, 'Error deleting interview question', error, 500);
  }
};

const bulkGenerateSequence = async (req, res) => {
  try {
    const { category, titles } = req.body;
    const generatedItems = generateInterviewQuestionsBulk(category || 'js', Array.isArray(titles) ? titles : []);
    
    const existing = await InterviewQuestion.find().select('question');
    const existingSet = new Set(existing.map(e => (e.question || '').toLowerCase().trim()));

    const uniqueItems = generatedItems.filter(item => !existingSet.has((item.question || '').toLowerCase().trim()));

    if (uniqueItems.length === 0) {
      return sendSuccess(res, 'All questions in this bank already exist in your database', []);
    }

    const itemsWithIds = uniqueItems.map(item => ({
      _id: item.id || `iq-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      id: item.id || `iq-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      ...item
    }));

    const created = await InterviewQuestion.insertMany(itemsWithIds);
    return sendSuccess(res, `Bulk generated ${created.length} unique interview questions`, created, 201);
  } catch (error) {
    return sendError(res, 'Error generating bulk interview questions', error, 500);
  }
};

module.exports = { getQuestions, createQuestion, deleteQuestion, bulkGenerateSequence };
