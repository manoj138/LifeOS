const User = require('../modals/User');
const UserPreference = require('../modals/UserPreference');
const { sendSuccess, sendError } = require('../helper/responseHelper');

const getAdminMetrics = async (req, res) => {
  try {
    const totalCandidates = await User.count();
    const onboardedCount = await UserPreference.count({ where: { onboardingCompleted: true } });
    const allPreferences = await UserPreference.findAll();

    const onboardingRate = totalCandidates > 0
      ? Number(((onboardedCount / totalCandidates) * 100).toFixed(1))
      : 0;

    // Compute average velocity from user target daily hours
    let avgVelocity = 0;
    if (allPreferences.length > 0) {
      const totalHours = allPreferences.reduce((acc, pref) => acc + (pref.dailyHours || 0), 0);
      avgVelocity = Number((totalHours / allPreferences.length).toFixed(1));
    }

    // Compute placement ready candidates (onboarding completed or active users)
    const placementReady = onboardedCount;

    // Role distribution analytics
    const roleCounts = {};
    allPreferences.forEach((pref) => {
      const role = pref.targetRole || 'Full-Stack Web Developer';
      roleCounts[role] = (roleCounts[role] || 0) + 1;
    });

    const roleDistribution = Object.keys(roleCounts).map((role) => ({
      role,
      count: roleCounts[role],
      percentage: totalCandidates > 0 ? Math.round((roleCounts[role] / totalCandidates) * 100) : 0,
    }));

    return sendSuccess(res, 'Admin metrics retrieved', {
      totalCandidates,
      onboardingRate,
      avgVelocity,
      placementReady,
      roleDistribution,
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

    const candidates = users.map((u) => {
      const pref = u.preferences || {};
      const readinessScore = pref.onboardingCompleted ? 88 : 45;
      return {
        id: u.id,
        name: u.name,
        email: u.email,
        targetRole: pref.targetRole || 'Full-Stack Web Developer',
        skillLevel: pref.careerLevel ? pref.careerLevel.split(' ')[0] : 'Intermediate',
        dailyHours: pref.dailyHours || 4,
        readinessScore,
        streak: pref.onboardingCompleted ? 7 : 0,
        completedTopics: pref.onboardingCompleted ? 12 : 0,
        status: pref.onboardingCompleted ? 'Placement Ready' : 'In Learning Phase',
        aiPersona: pref.aiPersona || 'Motivational Tech Mentor',
      };
    });

    return sendSuccess(res, 'Candidates list retrieved', candidates);
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


