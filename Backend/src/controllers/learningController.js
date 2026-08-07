const LearningProgress = require('../modals/LearningProgress');
const { sendSuccess, sendError } = require('../helper/responseHelper');

const getProgress = async (req, res) => {
  try {
    const userId = req.user.id;
    let progress = await LearningProgress.findOne({ userId });
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

    let progress = await LearningProgress.findOne({ userId });
    if (!progress) {
      progress = await LearningProgress.create({ userId });
    }

    let currentLessons = progress.completedLessons || [];
    let updatedLessons = [...currentLessons];
    if (updatedLessons.includes(lessonId)) {
      updatedLessons = updatedLessons.filter((id) => id !== lessonId);
    } else {
      updatedLessons.push(lessonId);
    }

    progress = await LearningProgress.findOneAndUpdate({ userId }, { completedLessons: updatedLessons }, { new: true });

    return sendSuccess(res, 'Lesson completion status updated', progress);
  } catch (error) {
    return sendError(res, 'Error updating lesson completion', error, 500);
  }
};

const toggleSolvedDsa = async (req, res) => {
  try {
    const userId = req.user.id;
    const { dsaId } = req.body;

    if (!dsaId) {
      return sendError(res, 'dsaId is required', null, 400);
    }

    let progress = await LearningProgress.findOne({ userId });
    if (!progress) {
      progress = await LearningProgress.create({ userId });
    }

    let currentSolved = progress.solvedDsaProblems || [];
    let updatedSolved = [...currentSolved];
    if (updatedSolved.includes(dsaId)) {
      updatedSolved = updatedSolved.filter((id) => id !== dsaId);
    } else {
      updatedSolved.push(dsaId);
    }

    progress = await LearningProgress.findOneAndUpdate({ userId }, { solvedDsaProblems: updatedSolved }, { new: true });

    return sendSuccess(res, 'DSA problem solved status updated', progress);
  } catch (error) {
    return sendError(res, 'Error updating DSA problem status', error, 500);
  }
};

module.exports = {
  getProgress,
  completeLesson,
  toggleSolvedDsa,
};
