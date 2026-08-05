const UserPreference = require('../modals/UserPreference');
const User = require('../modals/User');
const { sendSuccess, sendError } = require('../helper/responseHelper');

const saveOnboarding = async (req, res) => {
  try {
    const userId = req.user.id;
    const {
      name,
      pin,
      targetRole,
      careerLevel,
      focusAreas,
      skillLevels,
      dailyHours,
      targetDate,
      fitnessGoal,
      workoutType,
      aiPersona,
    } = req.body;

    if (name || pin) {
      const userUpdates = {};
      if (name) userUpdates.name = name;
      if (pin) userUpdates.pin = pin;
      await User.update(userUpdates, { where: { id: userId } });
    }

    let pref = await UserPreference.findOne({ where: { userId } });
    if (!pref) {
      pref = await UserPreference.create({ userId });
    }

    const payload = { ...req.body, onboardingCompleted: true };
    delete payload.name;
    delete payload.pin;

    await pref.update(payload);

    return sendSuccess(res, 'Onboarding completed and saved to database', pref);
  } catch (error) {
    return sendError(res, 'Error saving onboarding preferences', error, 500);
  }
};

const getPreferences = async (req, res) => {
  try {
    const userId = req.user.id;
    let pref = await UserPreference.findOne({ where: { userId } });
    if (!pref) {
      pref = await UserPreference.create({ userId });
    }
    return sendSuccess(res, 'User preferences retrieved successfully', pref);
  } catch (error) {
    return sendError(res, 'Error retrieving preferences', error, 500);
  }
};

const updatePreferences = async (req, res) => {
  try {
    const userId = req.user.id;
    let pref = await UserPreference.findOne({ where: { userId } });
    if (!pref) {
      pref = await UserPreference.create({ userId });
    }
    await pref.update(req.body);
    return sendSuccess(res, 'Preferences updated successfully', pref);
  } catch (error) {
    return sendError(res, 'Error updating preferences', error, 500);
  }
};

const resetOnboarding = async (req, res) => {
  try {
    const userId = req.user.id;
    let pref = await UserPreference.findOne({ where: { userId } });
    if (pref) {
      await pref.update({ onboardingCompleted: false });
    }
    return sendSuccess(res, 'Onboarding status reset successfully', { onboardingCompleted: false });
  } catch (error) {
    return sendError(res, 'Error resetting onboarding status', error, 500);
  }
};

module.exports = {
  saveOnboarding,
  getPreferences,
  updatePreferences,
  resetOnboarding,
};
