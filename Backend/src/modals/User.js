const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  _id: { type: Number, default: () => Date.now() },
  id: { type: Number, default: function() { return this._id; } },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  pin: { type: String, default: '1234' },
  role: { type: String, default: 'user' }
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);
