const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  _id: { type: String },
  id: { type: String },
  userId: { type: mongoose.Schema.Types.Mixed, required: true },
  title: { type: String, required: true },
  description: { type: String, default: '' },
  status: { type: String, default: 'In Progress' },
  techStack: { type: Array, default: ['React', 'Node.js', 'Express', 'MongoDB'] },
  kanbanTasks: {
    type: Array,
    default: [
      { id: 'k1', title: 'Setup Authentication & JWT', column: 'done' },
      { id: 'k2', title: 'Design RESTful API Schema', column: 'inProgress' },
      { id: 'k3', title: 'Deploy Nginx & Docker VPS', column: 'todo' }
    ]
  }
}, {
  timestamps: true
});

projectSchema.pre('save', function(next) {
  if (this.id && !this._id) {
    this._id = this.id;
  }
  next();
});

module.exports = mongoose.model('Project', projectSchema);
