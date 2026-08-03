const LearningProgress = require('../modals/LearningProgress');
const { sendSuccess, sendError } = require('../helper/responseHelper');

const getProgress = async (req, res) => {
  try {
    const userId = req.user.id;
    let progress = await LearningProgress.findOne({ where: { userId } });
    if (!progress) {
      progress = await LearningProgress.create({ userId });
    }
    return sendSuccess(res, 'Learning progress fetched', progress);
  } catch (error) {
    return sendError(res, 'Error fetching learning progress', error, 500);
  }
};

const completeLesson = async (req, res) => {
  try {
    const userId = req.user.id;
    const { lessonId } = req.body;

    if (!lessonId) {
      return sendError(res, 'lessonId is required', null, 400);
    }

    let progress = await LearningProgress.findOne({ where: { userId } });
    if (!progress) {
      progress = await LearningProgress.create({ userId });
    }

    const currentLessons = progress.completedLessons || [];
    if (!currentLessons.includes(lessonId)) {
      const updatedLessons = [...currentLessons, lessonId];
      await progress.update({ completedLessons: updatedLessons });
    }

    return sendSuccess(res, 'Lesson marked complete', progress);
  } catch (error) {
    return sendError(res, 'Error updating lesson completion', error, 500);
  }
};

module.exports = {
  getProgress,
  completeLesson,
};
