const EnglishModule = require('../modals/EnglishModule');
const { sendSuccess, sendError } = require('../helper/responseHelper');
const { generateEnglishModulesBulk } = require('../helper/aiGenerator');

const getModules = async (req, res) => {
  try {
    const modules = await EnglishModule.find().sort({ createdAt: 1 });
    return sendSuccess(res, 'English modules fetched successfully', modules);
  } catch (error) {
    return sendError(res, 'Error fetching English modules', error, 500);
  }
};

const createModule = async (req, res) => {
  try {
    const id = req.body.id || `eng-${Date.now()}`;
    const newModule = await EnglishModule.create({ _id: id, id, ...req.body });
    return sendSuccess(res, 'English module created successfully', newModule, 201);
  } catch (error) {
    return sendError(res, 'Error creating English module', error, 500);
  }
};

const deleteModule = async (req, res) => {
  try {
    const { id } = req.params;
    await EnglishModule.deleteOne({ _id: id });
    return sendSuccess(res, 'English module deleted successfully', null);
  } catch (error) {
    return sendError(res, 'Error deleting English module', error, 500);
  }
};

const bulkGenerateSequence = async (req, res) => {
  try {
    const { titles } = req.body;
    if (!Array.isArray(titles) || titles.length === 0) {
      return sendError(res, 'Titles array is required', null, 400);
    }
    const generatedItems = generateEnglishModulesBulk(titles);
    const itemsWithIds = generatedItems.map(item => ({
      _id: item.id || `eng-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      id: item.id || `eng-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      ...item
    }));

    const created = await EnglishModule.insertMany(itemsWithIds);
    return sendSuccess(res, 'Bulk English modules generated successfully', created, 201);
  } catch (error) {
    return sendError(res, 'Error generating bulk English modules', error, 500);
  }
};

module.exports = { getModules, createModule, deleteModule, bulkGenerateSequence };
