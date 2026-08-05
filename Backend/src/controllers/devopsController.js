const DevopsStep = require('../modals/DevopsStep');
const { sendSuccess, sendError } = require('../helper/responseHelper');

const getSteps = async (req, res) => {
  try {
    const steps = await DevopsStep.findAll({ order: [['stepNumber', 'ASC']] });
    return sendSuccess(res, 'DevOps steps fetched successfully', steps);
  } catch (error) {
    return sendError(res, 'Error fetching DevOps steps', error, 500);
  }
};

const createStep = async (req, res) => {
  try {
    const id = req.body.id || `dev-${Date.now()}`;
    const newStep = await DevopsStep.create({ id, ...req.body });
    return sendSuccess(res, 'DevOps step created successfully', newStep, 201);
  } catch (error) {
    return sendError(res, 'Error creating DevOps step', error, 500);
  }
};

const deleteStep = async (req, res) => {
  try {
    const { id } = req.params;
    await DevopsStep.destroy({ where: { id } });
    return sendSuccess(res, 'DevOps step deleted successfully', null);
  } catch (error) {
    return sendError(res, 'Error deleting DevOps step', error, 500);
  }
};

const { generateDevopsStepsBulk } = require('../helper/aiGenerator');

const bulkGenerateSequence = async (req, res) => {
  try {
    const { titles } = req.body;
    if (!Array.isArray(titles) || titles.length === 0) {
      return sendError(res, 'Titles array is required', null, 400);
    }
    const generatedItems = generateDevopsStepsBulk(titles);
    const created = await DevopsStep.bulkCreate(generatedItems);
    return sendSuccess(res, 'Bulk DevOps steps generated successfully', created, 201);
  } catch (error) {
    return sendError(res, 'Error generating bulk DevOps steps', error, 500);
  }
};

module.exports = { getSteps, createStep, deleteStep, bulkGenerateSequence };
