const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  _id: { type: Number },
  id: { type: Number },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  pin: { type: String, default: '1234' },
  role: { type: String, default: 'user' }
}, {
  timestamps: true
});

userSchema.pre('save', function(next) {
  if (this.isNew && !this._id) {
    this._id = Date.now();
    this.id = this._id;
  }
  next();
});

module.exports = mongoose.model('User', userSchema);
