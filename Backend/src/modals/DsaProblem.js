const mongoose = require('mongoose');

const dsaProblemSchema = new mongoose.Schema({
  _id: { type: String, default: function() { return this.id || `dsa-${Date.now()}`; } },
  id: { type: String },
  title: { type: String, required: true },
  difficulty: { type: String, default: 'Medium' },
  topic: { type: String, required: true },
  timeLimit: { type: String, default: 'O(N)' },
  language: { type: String, default: 'javascript' },
  description: { type: String, required: true },
  hint: { type: String, default: '' },
  starterCode: { type: String, default: '' },
  solutionCode: { type: String, default: '' }
}, {
  timestamps: true
});

module.exports = mongoose.model('DsaProblem', dsaProblemSchema);
