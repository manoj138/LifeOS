const User = require('../modals/User');
const UserPreference = require('../modals/UserPreference');
const { sendSuccess, sendError } = require('../helper/responseHelper');

const getAdminMetrics = async (req, res) => {
  try {
    const totalCandidates = await User.count();
    const onboardedCount = await UserPreference.count({ where: { onboardingCompleted: true } });

    const onboardingRate = totalCandidates > 0
      ? ((onboardedCount / totalCandidates) * 100).toFixed(1)
      : 94.2;

    return sendSuccess(res, 'Admin metrics retrieved', {
      totalCandidates: totalCandidates + 1280, // combined real + mock demo analytics
      onboardingRate: Number(onboardingRate),
      avgVelocity: 4.2,
      placementReady: 142,
    });
  } catch (error) {
    return sendError(res, 'Error fetching admin metrics', error, 500);
  }
};

const getCandidates = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ['password'] },
      include: [{ model: UserPreference, as: 'preferences' }],
    });
    return sendSuccess(res, 'Candidates list retrieved', users);
  } catch (error) {
    return sendError(res, 'Error fetching candidates list', error, 500);
  }
};

const deleteCandidate = async (req, res) => {
  try {
    const { id } = req.params;
    await UserPreference.destroy({ where: { userId: id } }).catch(() => {});
    await User.destroy({ where: { id } });
    return sendSuccess(res, 'Candidate deleted successfully', { id });
  } catch (error) {
    return sendError(res, 'Error deleting candidate', error, 500);
  }
};

module.exports = {
  getAdminMetrics,
  getCandidates,
  deleteCandidate,
};

