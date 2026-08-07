const User = require('../modals/User');
const UserPreference = require('../modals/UserPreference');
const LearningProgress = require('../modals/LearningProgress');
const PlannerTask = require('../modals/PlannerTask');
const Project = require('../modals/Project');
const { sendSuccess, sendError } = require('../helper/responseHelper');

const getAdminMetrics = async (req, res) => {
  try {
    const allUsers = await User.find().select('-password');
    const allPrefs = await UserPreference.find();

    const prefsMap = {};
    allPrefs.forEach(p => {
      prefsMap[p.userId] = p;
    });

    const candidateUsers = allUsers.filter(
      (u) => u.role !== 'admin' && !u.email?.toLowerCase().includes('admin') && u.name !== 'System Admin'
    );

    const totalCandidates = candidateUsers.length;
    const onboardedCount = candidateUsers.filter((u) => prefsMap[u.id || u._id]?.onboardingCompleted).length;
    const allPreferences = candidateUsers.map((u) => prefsMap[u.id || u._id]).filter(Boolean);

    const onboardingRate = totalCandidates > 0
      ? Number(((onboardedCount / totalCandidates) * 100).toFixed(1))
      : 0;

    let avgVelocity = 0;
    if (allPreferences.length > 0) {
      const totalHours = allPreferences.reduce((acc, pref) => acc + (pref.dailyHours || 0), 0);
      avgVelocity = Number((totalHours / allPreferences.length).toFixed(1));
    }

    const placementReady = onboardedCount;

    const roleCounts = {};
    const skillCounts = { Beginner: 0, Intermediate: 0, Advanced: 0 };
    const commitmentCounts = { '1 Hour / day': 0, '2 Hours / day': 0, '4 Hours / day': 0, '6+ Hours / day': 0 };

    allPreferences.forEach((pref) => {
      const role = pref.targetRole || 'Full-Stack Web Developer';
      roleCounts[role] = (roleCounts[role] || 0) + 1;

      const levelRaw = (typeof pref.careerLevel === 'string' && pref.careerLevel) ? pref.careerLevel.split(' ')[0] : 'Intermediate';
      const level = ['Beginner', 'Intermediate', 'Advanced'].includes(levelRaw) ? levelRaw : 'Intermediate';
      skillCounts[level] = (skillCounts[level] || 0) + 1;

      const hours = Number(pref.dailyHours) || 4;
      if (hours <= 1) commitmentCounts['1 Hour / day'] += 1;
      else if (hours <= 2) commitmentCounts['2 Hours / day'] += 1;
      else if (hours <= 5) commitmentCounts['4 Hours / day'] += 1;
      else commitmentCounts['6+ Hours / day'] += 1;
    });

    const roleDistribution = Object.keys(roleCounts).map((role) => ({
      role,
      count: roleCounts[role],
      percentage: totalCandidates > 0 ? Math.round((roleCounts[role] / totalCandidates) * 100) : 0,
    }));

    const skillLevelDistribution = Object.keys(skillCounts).map((level) => ({
      level,
      count: skillCounts[level],
      percentage: totalCandidates > 0 ? Math.round((skillCounts[level] / totalCandidates) * 100) : 0,
    }));

    const dailyCommitmentDistribution = Object.keys(commitmentCounts).map((hoursKey) => ({
      hours: hoursKey,
      count: commitmentCounts[hoursKey],
      percentage: totalCandidates > 0 ? Math.round((commitmentCounts[hoursKey] / totalCandidates) * 100) : 0,
    }));

    return sendSuccess(res, 'Admin metrics retrieved', {
      totalCandidates,
      onboardingRate,
      avgVelocity,
      placementReady,
      roleDistribution,
      skillLevelDistribution,
      dailyCommitmentDistribution,
    });
  } catch (error) {
    console.error("❌ getAdminMetrics Error:", error);
    return sendError(res, 'Error fetching admin metrics', error.message || error, 500);
  }
};

const getCandidates = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    const allPrefs = await UserPreference.find();
    const allProgs = await LearningProgress.find();

    const prefsMap = {};
    allPrefs.forEach(p => { prefsMap[p.userId] = p; });

    const progsMap = {};
    allProgs.forEach(p => { progsMap[p.userId] = p; });

    const candidateOnlyUsers = users.filter(
      (u) => u.role !== 'admin' && !u.email?.toLowerCase().includes('admin') && u.name !== 'System Admin'
    );

    const candidates = candidateOnlyUsers.map((u) => {
      const uId = u.id || u._id;
      const pref = prefsMap[uId] || {};
      const prog = progsMap[uId] || {};
      const completedLessons = Array.isArray(prog.completedLessons) ? prog.completedLessons : [];
      const completedTopics = completedLessons.length > 0 ? completedLessons.length : (pref.onboardingCompleted ? 1 : 0);

      const onboardingScore = pref.onboardingCompleted ? 40 : 10;
      const topicsScore = Math.min(50, completedTopics * 10);
      const hoursScore = Math.min(10, (Number(pref.dailyHours) || 1) * 2.5);
      const readinessScore = Math.min(100, Math.round(onboardingScore + topicsScore + hoursScore));

      const streak = pref.onboardingCompleted ? Math.max(1, completedTopics) : 0;
      const status = readinessScore >= 80 ? 'Placement Ready' : 'In Learning Phase';

      return {
        id: uId,
        name: u.name,
        email: u.email,
        role: u.role,
        targetRole: pref.targetRole || 'Full-Stack Web Developer',
        skillLevel: (typeof pref.careerLevel === 'string' && pref.careerLevel) ? pref.careerLevel.split(' ')[0] : 'Intermediate',
        dailyHours: Number(pref.dailyHours) || 4,
        readinessScore,
        streak,
        completedTopics,
        status,
        aiPersona: pref.aiPersona || 'Motivational Tech Mentor',
      };
    });

    return sendSuccess(res, 'Candidates list retrieved', candidates);
  } catch (error) {
    console.error("❌ getCandidates Error:", error);
    return sendError(res, 'Error fetching candidates list', error.message || error, 500);
  }
};

const deleteCandidate = async (req, res) => {
  try {
    const { id } = req.params;
    const targetId = Number(id) || id;

    await UserPreference.deleteMany({ userId: targetId });
    await LearningProgress.deleteMany({ userId: targetId });
    await PlannerTask.deleteMany({ userId: targetId });
    await Project.deleteMany({ userId: targetId });
    await User.deleteOne({ _id: targetId });

    return sendSuccess(res, 'Candidate deleted successfully', { id: targetId });
  } catch (error) {
    return sendError(res, 'Error deleting candidate', error.message || error, 500);
  }
};

module.exports = {
  getAdminMetrics,
  getCandidates,
  deleteCandidate,
};
