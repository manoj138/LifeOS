const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../modals/User');
const UserPreference = require('../modals/UserPreference');
const LearningProgress = require('../modals/LearningProgress');
const { sendSuccess, sendError } = require('../helper/responseHelper');

const generateToken = (userId) => {
  return jwt.sign(
    { id: userId },
    process.env.JWT_SECRET || 'your_super_secret_jwt_key',
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );
};

const register = async (req, res) => {
  try {
    const { name, email, password, pin } = req.body;

    if (!email || !password) {
      return sendError(res, 'Email and password are required', null, 400);
    }

    const cleanEmail = email.trim().toLowerCase();
    const existingUser = await User.findOne({ email: cleanEmail });
    if (existingUser) {
      return sendError(res, 'Email is already registered', null, 400);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const userRole = cleanEmail.includes('admin') ? 'admin' : 'candidate';
    const userId = Date.now();

    const newUser = await User.create({
      _id: userId,
      id: userId,
      name: name || 'Member',
      email: cleanEmail,
      password: hashedPassword,
      pin: pin || '1234',
      role: userRole,
    });

    const preferences = await UserPreference.create({ userId: newUser.id || newUser._id });
    await LearningProgress.create({ userId: newUser.id || newUser._id });

    const token = generateToken(newUser.id || newUser._id);

    return sendSuccess(res, 'Account created successfully', {
      token,
      user: {
        id: newUser.id || newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
      preferences,
    }, 201);
  } catch (error) {
    return sendError(res, 'Error creating account', error, 500);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return sendError(res, 'Email and password are required', null, 400);
    }

    const cleanEmail = email.trim().toLowerCase();
    const user = await User.findOne({ email: cleanEmail });

    if (!user) {
      return sendError(res, 'Invalid email or password', null, 401);
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return sendError(res, 'Invalid email or password', null, 401);
    }

    const preferences = await UserPreference.findOne({ userId: user.id || user._id });
    const token = generateToken(user.id || user._id);

    return sendSuccess(res, 'Logged in successfully', {
      token,
      user: {
        id: user.id || user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      preferences: preferences || {},
    });
  } catch (error) {
    return sendError(res, 'Login error', error, 500);
  }
};

const pinLogin = async (req, res) => {
  try {
    const { email, pin } = req.body;

    if (!email || !pin) {
      return sendError(res, 'Email and PIN are required for PIN verification', null, 400);
    }

    const cleanEmail = email.trim().toLowerCase();
    const cleanPin = String(pin).trim();

    const user = await User.findOne({ email: cleanEmail, pin: cleanPin });
    if (!user) {
      return sendError(res, 'Invalid Email or PIN combination', null, 401);
    }

    const preferences = await UserPreference.findOne({ userId: user.id || user._id });
    const token = generateToken(user.id || user._id);

    return sendSuccess(res, 'PIN login successful', {
      token,
      user: {
        id: user.id || user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      preferences: preferences || {},
    });
  } catch (error) {
    return sendError(res, 'PIN verification error', error, 500);
  }
};

const getMe = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user.id }).select('-password');
    const preferences = await UserPreference.findOne({ userId: req.user.id });

    const userData = user ? user.toObject() : {};
    userData.preferences = preferences || {};

    return sendSuccess(res, 'User profile fetched successfully', userData);
  } catch (error) {
    return sendError(res, 'Error fetching user profile', error, 500);
  }
};

module.exports = {
  register,
  login,
  pinLogin,
  getMe,
};
