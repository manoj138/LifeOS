const jwt = require('jsonwebtoken');
const { sendError } = require('../helper/responseHelper');
const User = require('../modals/User');

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return sendError(res, 'Authentication token missing or invalid', null, 401);
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_super_secret_jwt_key');
    
    const user = await User.findByPk(decoded.id);
    if (!user) {
      return sendError(res, 'User no longer exists', null, 401);
    }

    req.user = user;
    next();
  } catch (error) {
    return sendError(res, 'Unauthorized access', error, 401);
  }
};

module.exports = authMiddleware;
