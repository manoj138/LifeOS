const Goal = require('../modals/Goal');
const { sendSuccess, sendError } = require('../helper/responseHelper');

const getGoals = async (req, res) => {
  try {
    const userId = req.user.id;
    const goals = await Goal.findAll({ where: { userId } });
    return sendSuccess(res, 'Goals fetched successfully', goals);
  } catch (error) {
    return sendError(res, 'Error fetching goals', error, 500);
  }
};

const createGoal = async (req, res) => {
  try {
    const userId = req.user.id;
    const { title, deadline, category, milestones } = req.body;
    const newGoal = await Goal.create({
      id: `g_${Date.now()}`,
      userId,
      title,
      deadline: deadline || 'Q4 2026',
      category: category || 'Career',
      milestones: milestones || [],
    });
    return sendSuccess(res, 'Goal created', newGoal, 201);
  } catch (error) {
    return sendError(res, 'Error creating goal', error, 500);
  }
};

module.exports = {
  getGoals,
  createGoal,
};
