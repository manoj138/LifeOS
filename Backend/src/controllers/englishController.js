const EnglishModule = require('../modals/EnglishModule');
const { sendSuccess, sendError } = require('../helper/responseHelper');

const getModules = async (req, res) => {
  try {
    const modules = await EnglishModule.findAll({ order: [['createdAt', 'ASC']] });
    return sendSuccess(res, 'English modules fetched successfully', modules);
  } catch (error) {
    return sendError(res, 'Error fetching English modules', error, 500);
  }
};

const createModule = async (req, res) => {
  try {
    const id = req.body.id || `eng-${Date.now()}`;
    const newModule = await EnglishModule.create({ id, ...req.body });
    return sendSuccess(res, 'English module created successfully', newModule, 201);
  } catch (error) {
    return sendError(res, 'Error creating English module', error, 500);
  }
};

module.exports = { getModules, createModule };
