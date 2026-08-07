const mongoose = require('mongoose');

const interviewQuestionSchema = new mongoose.Schema({
  _id: { type: String, default: function() { return this.id || `iq-${Date.now()}`; } },
  id: { type: String },
  category: { type: String, required: true, default: 'js' },
  question: { type: String, required: true },
  answer: { type: String, required: true },
  marathiIntent: { type: String, default: '' },
  difficulty: { type: String, default: 'Beginner' }
}, {
  timestamps: true
});

module.exports = mongoose.model('InterviewQuestion', interviewQuestionSchema);
