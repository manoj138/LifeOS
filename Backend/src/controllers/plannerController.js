const PlannerTask = require('../modals/PlannerTask');
const { sendSuccess, sendError } = require('../helper/responseHelper');

const getTasks = async (req, res) => {
  try {
    const userId = req.user ? req.user.id : 1;
    const tasks = await PlannerTask.findAll({ where: { userId } });
    return sendSuccess(res, 'Planner tasks fetched', tasks);
  } catch (error) {
    return sendError(res, 'Error fetching tasks', error, 500);
  }
};

const createTask = async (req, res) => {
  try {
    const userId = req.user ? req.user.id : 1;
    const { title, start, end, category, energy } = req.body;
    const newTask = await PlannerTask.create({
      id: `t_${Date.now()}`,
      userId,
      title,
      start: start || '09:00 AM',
      end: end || '10:00 AM',
      category: category || 'Deep Work',
      energy: energy || 'High',
      completed: false,
    });
    return sendSuccess(res, 'Task created', newTask, 201);
  } catch (error) {
    return sendError(res, 'Error creating task', error, 500);
  }
};

const toggleTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await PlannerTask.findByPk(id);
    if (!task) return sendError(res, 'Task not found', null, 404);

    await task.update({ completed: !task.completed });
    return sendSuccess(res, 'Task updated', task);
  } catch (error) {
    return sendError(res, 'Error toggling task', error, 500);
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await PlannerTask.findByPk(id);
    if (task) await task.destroy();
    return sendSuccess(res, 'Task deleted successfully');
  } catch (error) {
    return sendError(res, 'Error deleting task', error, 500);
  }
};

module.exports = {
  getTasks,
  createTask,
  toggleTask,
  deleteTask,
};
