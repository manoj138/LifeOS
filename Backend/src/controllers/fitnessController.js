const FitnessLog = require('../modals/FitnessLog');
const { sendSuccess, sendError } = require('../helper/responseHelper');

const getFitnessLogs = async (req, res) => {
  try {
    const userId = req.user ? req.user.id : 1;
    let log = await FitnessLog.findOne({ where: { userId } });
    if (!log) {
      log = await FitnessLog.create({ userId });
    }
    return sendSuccess(res, 'Fitness logs fetched', log);
  } catch (error) {
    return sendError(res, 'Error fetching fitness log', error, 500);
  }
};

const updateFitnessLog = async (req, res) => {
  try {
    const userId = req.user ? req.user.id : 1;
    let log = await FitnessLog.findOne({ where: { userId } });
    if (!log) {
      log = await FitnessLog.create({ userId });
    }
    await log.update(req.body);
    return sendSuccess(res, 'Fitness log updated', log);
  } catch (error) {
    return sendError(res, 'Error updating fitness log', error, 500);
  }
};

module.exports = {
  getFitnessLogs,
  updateFitnessLog,
};
