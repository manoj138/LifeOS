const mongoose = require('mongoose');

const interviewQuestionSchema = new mongoose.Schema({
  _id: { type: String },
  id: { type: String },
  category: { type: String, required: true, default: 'js' },
  question: { type: String, required: true },
  answer: { type: String, required: true },
  marathiIntent: { type: String, default: '' },
  difficulty: { type: String, default: 'Beginner' }
}, {
  timestamps: true
});

interviewQuestionSchema.pre('save', function(next) {
  if (this.id && !this._id) {
    this._id = this.id;
  }
  next();
});

module.exports = mongoose.model('InterviewQuestion', interviewQuestionSchema);
