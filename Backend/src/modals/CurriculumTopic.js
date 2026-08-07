const mongoose = require('mongoose');

const curriculumTopicSchema = new mongoose.Schema({
  _id: { type: String },
  id: { type: String },
  moduleId: { type: String, required: true, default: 'js' },
  title: { type: String, required: true },
  topicName: { type: String, required: true },
  level: { type: String, default: 'Beginner' },
  order: { type: Number, default: 1 },
  conceptExplanation: { type: String, default: '' },
  codeSnippet: { type: String, default: '' },
  projectApplication: { type: String, default: '' },
  quizQuestions: { type: Array, default: [] },
  taskTitle: { type: String, default: '' },
  taskDescription: { type: String, default: '' },
  starterCode: { type: String, default: '' },
  solutionCriteria: { type: String, default: '' }
}, {
  timestamps: true
});

curriculumTopicSchema.pre('save', function(next) {
  if (this.id && !this._id) {
    this._id = this.id;
  }
  next();
});

module.exports = mongoose.model('CurriculumTopic', curriculumTopicSchema);
