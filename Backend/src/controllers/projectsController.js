const Project = require('../modals/Project');
const { sendSuccess, sendError } = require('../helper/responseHelper');

const getProjects = async (req, res) => {
  try {
    const userId = req.user.id;
    const projects = await Project.find({ userId });
    return sendSuccess(res, 'Projects fetched', projects);
  } catch (error) {
    return sendError(res, 'Error fetching projects', error, 500);
  }
};

const createProject = async (req, res) => {
  try {
    const userId = req.user.id;
    const { title, description, techStack } = req.body;
    const id = `p_${Date.now()}`;
    const newProj = await Project.create({
      _id: id,
      id,
      userId,
      title,
      description: description || '',
      techStack: techStack || ['React', 'Node.js'],
    });
    return sendSuccess(res, 'Project created', newProj, 201);
  } catch (error) {
    return sendError(res, 'Error creating project', error, 500);
  }
};

module.exports = {
  getProjects,
  createProject,
};
