const mongoose = require('mongoose');

const learningProgressSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.Mixed, required: true },
  lastActiveModule: { type: String, default: 'js' },
  completedLessons: { type: Array, default: ['js-0'] },
  solvedDsaProblems: { type: Array, default: [] },
  passedQuizzes: { type: Object, default: {} }
}, {
  timestamps: true
});

module.exports = mongoose.model('LearningProgress', learningProgressSchema);
