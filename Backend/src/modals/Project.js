const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  _id: { type: String, default: function() { return this.id || `p_${Date.now()}`; } },
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

module.exports = mongoose.model('Project', projectSchema);
