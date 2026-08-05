const DsaProblem = require('../modals/DsaProblem');
const { sendSuccess, sendError } = require('../helper/responseHelper');

const getProblems = async (req, res) => {
  try {
    const problems = await DsaProblem.findAll({ order: [['createdAt', 'ASC']] });
    return sendSuccess(res, 'DSA problems fetched successfully', problems);
  } catch (error) {
    return sendError(res, 'Error fetching DSA problems', error, 500);
  }
};

const createProblem = async (req, res) => {
  try {
    const id = req.body.id || `dsa-${Date.now()}`;
    const newProblem = await DsaProblem.create({ id, ...req.body });
    return sendSuccess(res, 'DSA problem created successfully', newProblem, 201);
  } catch (error) {
    return sendError(res, 'Error creating DSA problem', error, 500);
  }
};

module.exports = { getProblems, createProblem };
