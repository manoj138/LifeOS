const mongoose = require('mongoose');

const englishModuleSchema = new mongoose.Schema({
  _id: { type: String },
  id: { type: String },
  category: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  badgeLabel: { type: String, default: '' },
  badgeColor: { type: String, default: 'emerald' }
}, {
  timestamps: true
});

englishModuleSchema.pre('save', function(next) {
  if (this.id && !this._id) {
    this._id = this.id;
  }
  next();
});

module.exports = mongoose.model('EnglishModule', englishModuleSchema);
