const PlannerTask = require('../modals/PlannerTask');
const { sendSuccess, sendError } = require('../helper/responseHelper');

const getTasks = async (req, res) => {
  try {
    const userId = req.user.id;
    const tasks = await PlannerTask.find({ userId });
    return sendSuccess(res, 'Planner tasks fetched', tasks);
  } catch (error) {
    return sendError(res, 'Error fetching tasks', error, 500);
  }
};

const createTask = async (req, res) => {
  try {
    const userId = req.user.id;
    const { title, start, end, category, energy } = req.body;
    const id = `t_${Date.now()}`;
    const newTask = await PlannerTask.create({
      _id: id,
      id,
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
    const userId = req.user.id;
    const task = await PlannerTask.findOne({ _id: id, userId });
    if (!task) return sendError(res, 'Task not found', null, 404);

    task.completed = !task.completed;
    await task.save();
    return sendSuccess(res, 'Task updated', task);
  } catch (error) {
    return sendError(res, 'Error toggling task', error, 500);
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    await PlannerTask.deleteOne({ _id: id, userId });
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
