const HabitLog = require('../modals/HabitLog');
const { sendSuccess, sendError } = require('../helper/responseHelper');

const getHabits = async (req, res) => {
  try {
    const userId = req.user ? req.user.id : 1;
    const habits = await HabitLog.findAll({ where: { userId } });
    return sendSuccess(res, 'Habits fetched', habits);
  } catch (error) {
    return sendError(res, 'Error fetching habits', error, 500);
  }
};

const checkinHabit = async (req, res) => {
  try {
    const { id } = req.params;
    const habit = await HabitLog.findByPk(id);
    if (!habit) return sendError(res, 'Habit not found', null, 404);

    const newCompleted = !habit.completedToday;
    const newStreak = newCompleted ? habit.streak + 1 : Math.max(0, habit.streak - 1);
    await habit.update({ completedToday: newCompleted, streak: newStreak });

    return sendSuccess(res, 'Habit checked in', habit);
  } catch (error) {
    return sendError(res, 'Error checking in habit', error, 500);
  }
};

module.exports = {
  getHabits,
  checkinHabit,
};
