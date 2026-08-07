const mongoose = require('mongoose');

const plannerTaskSchema = new mongoose.Schema({
  _id: { type: String },
  id: { type: String },
  userId: { type: mongoose.Schema.Types.Mixed, required: true },
  title: { type: String, required: true },
  start: { type: String, default: '09:00 AM' },
  end: { type: String, default: '10:00 AM' },
  category: { type: String, default: 'Deep Work' },
  energy: { type: String, default: 'High' },
  completed: { type: Boolean, default: false },
  date: { type: String, default: () => new Date().toISOString().split('T')[0] }
}, {
  timestamps: true
});

plannerTaskSchema.pre('save', function(next) {
  if (this.id && !this._id) {
    this._id = this.id;
  }
  next();
});

module.exports = mongoose.model('PlannerTask', plannerTaskSchema);
