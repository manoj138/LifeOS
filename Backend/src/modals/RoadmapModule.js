const mongoose = require('mongoose');

const roadmapModuleSchema = new mongoose.Schema({
  _id: { type: String },
  id: { type: String },
  title: { type: String, required: true },
  iconName: { type: String, default: 'Code2' },
  order: { type: Number, default: 1 },
  description: { type: String, default: '' }
}, {
  timestamps: true
});

roadmapModuleSchema.pre('save', function(next) {
  if (this.id && !this._id) {
    this._id = this.id;
  }
  next();
});

module.exports = mongoose.model('RoadmapModule', roadmapModuleSchema);
