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

const deleteProblem = async (req, res) => {
  try {
    const { id } = req.params;
    await DsaProblem.destroy({ where: { id } });
    return sendSuccess(res, 'DSA problem deleted successfully', null);
  } catch (error) {
    return sendError(res, 'Error deleting DSA problem', error, 500);
  }
};

const { generateDsaProblemsBulk } = require('../helper/aiGenerator');

const bulkGenerateSequence = async (req, res) => {
  try {
    const { titles } = req.body;
    if (!Array.isArray(titles) || titles.length === 0) {
      return sendError(res, 'Titles array is required', null, 400);
    }
    const generatedItems = generateDsaProblemsBulk(titles);
    
    const existing = await DsaProblem.findAll({ attributes: ['title'] });
    const existingSet = new Set(existing.map(e => (e.title || '').toLowerCase().trim()));
    const uniqueItems = generatedItems.filter(item => !existingSet.has((item.title || '').toLowerCase().trim()));

    if (uniqueItems.length === 0) {
      return sendSuccess(res, 'All DSA problems in this batch already exist', []);
    }

    const created = await DsaProblem.bulkCreate(uniqueItems);
    return sendSuccess(res, `Bulk generated ${created.length} unique DSA problems`, created, 201);
  } catch (error) {
    return sendError(res, 'Error generating bulk DSA problems', error, 500);
  }
};

module.exports = { getProblems, createProblem, deleteProblem, bulkGenerateSequence };
