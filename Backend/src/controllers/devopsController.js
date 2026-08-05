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

module.exports = { getSteps, createStep };
