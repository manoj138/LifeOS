const UserPreference = require('../modals/UserPreference');
const User = require('../modals/User');
const { sendSuccess, sendError } = require('../helper/responseHelper');

const saveOnboarding = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, pin } = req.body;

    if (name || pin) {
      const userUpdates = {};
      if (name) userUpdates.name = name;
      if (pin) userUpdates.pin = pin;
      await User.findOneAndUpdate({ _id: userId }, userUpdates);
    }

    let pref = await UserPreference.findOne({ userId });
    if (!pref) {
      pref = await UserPreference.create({ userId });
    }

    const payload = { ...req.body, onboardingCompleted: true };
    delete payload.name;
    delete payload.pin;

    pref = await UserPreference.findOneAndUpdate({ userId }, payload, { new: true });

    return sendSuccess(res, 'Onboarding completed and saved to database', pref);
  } catch (error) {
    return sendError(res, 'Error saving onboarding preferences', error, 500);
  }
};

const getPreferences = async (req, res) => {
  try {
    const userId = req.user.id;
    let pref = await UserPreference.findOne({ userId });
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
    let pref = await UserPreference.findOneAndUpdate({ userId }, req.body, { new: true, upsert: true });
    return sendSuccess(res, 'Preferences updated successfully', pref);
  } catch (error) {
    return sendError(res, 'Error updating preferences', error, 500);
  }
};

const resetOnboarding = async (req, res) => {
  try {
    const userId = req.user.id;
    await UserPreference.findOneAndUpdate({ userId }, { onboardingCompleted: false });
    return sendSuccess(res, 'Onboarding status reset successfully', { onboardingCompleted: false });
  } catch (error) {
    return sendError(res, 'Error resetting onboarding status', error, 500);
  }
};

const getProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findOne({ _id: userId }).select('-password');
    let pref = await UserPreference.findOne({ userId });
    if (!pref) {
      pref = await UserPreference.create({ userId });
    }
    return sendSuccess(res, 'User profile retrieved successfully', { user, preferences: pref });
  } catch (error) {
    return sendError(res, 'Error retrieving user profile', error, 500);
  }
};

const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, email, ...prefData } = req.body;
    const userUpdates = {};
    if (name) userUpdates.name = name;
    if (email) userUpdates.email = email;
    if (Object.keys(userUpdates).length > 0) {
      await User.findOneAndUpdate({ _id: userId }, userUpdates);
    }

    let pref = await UserPreference.findOneAndUpdate({ userId }, prefData, { new: true, upsert: true });
    const updatedUser = await User.findOne({ _id: userId }).select('-password');
    return sendSuccess(res, 'User profile updated successfully', { user: updatedUser, preferences: pref });
  } catch (error) {
    return sendError(res, 'Error updating user profile', error, 500);
  }
};

module.exports = {
  saveOnboarding,
  getPreferences,
  updatePreferences,
  resetOnboarding,
  getProfile,
  updateProfile,
};
