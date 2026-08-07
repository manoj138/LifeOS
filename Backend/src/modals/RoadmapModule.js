const mongoose = require('mongoose');

const roadmapModuleSchema = new mongoose.Schema({
  _id: { type: String, default: function() { return this.id || `mod-${Date.now()}`; } },
  id: { type: String },
  title: { type: String, required: true },
  iconName: { type: String, default: 'Code2' },
  order: { type: Number, default: 1 },
  description: { type: String, default: '' }
}, {
  timestamps: true
});

module.exports = mongoose.model('RoadmapModule', roadmapModuleSchema);
