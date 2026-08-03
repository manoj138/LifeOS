const Project = require('../modals/Project');
const { sendSuccess, sendError } = require('../helper/responseHelper');

const getProjects = async (req, res) => {
  try {
    const userId = req.user ? req.user.id : 1;
    const projects = await Project.findAll({ where: { userId } });
    return sendSuccess(res, 'Projects fetched', projects);
  } catch (error) {
    return sendError(res, 'Error fetching projects', error, 500);
  }
};

const createProject = async (req, res) => {
  try {
    const userId = req.user ? req.user.id : 1;
    const { title, description, techStack } = req.body;
    const newProj = await Project.create({
      id: `p_${Date.now()}`,
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
