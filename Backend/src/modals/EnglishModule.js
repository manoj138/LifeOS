const mongoose = require('mongoose');

const englishModuleSchema = new mongoose.Schema({
  _id: { type: String, default: function() { return this.id || `eng-${Date.now()}`; } },
  id: { type: String },
  category: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  badgeLabel: { type: String, default: '' },
  badgeColor: { type: String, default: 'emerald' }
}, {
  timestamps: true
});

module.exports = mongoose.model('EnglishModule', englishModuleSchema);
