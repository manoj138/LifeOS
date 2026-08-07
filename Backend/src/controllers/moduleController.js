const RoadmapModule = require('../modals/RoadmapModule');
const CurriculumTopic = require('../modals/CurriculumTopic');
const { sendSuccess, sendError } = require('../helper/responseHelper');

const getAllModules = async (req, res) => {
  try {
    const modules = await RoadmapModule.find().sort({ order: 1 });
    return sendSuccess(res, 'Roadmap modules fetched successfully', modules);
  } catch (error) {
    return sendError(res, 'Error fetching roadmap modules', error, 500);
  }
};

const createModule = async (req, res) => {
  try {
    const { id, title, iconName = 'Code2', order = 99, description = '' } = req.body;
    if (!title) {
      return sendError(res, 'Module title is required', null, 400);
    }

    const moduleId = id ? id.toLowerCase().replace(/\s+/g, '-') : `mod-${Date.now()}`;

    const existing = await RoadmapModule.findOne({ _id: moduleId });
    if (existing) {
      return sendError(res, 'Module ID already exists', null, 400);
    }

    const newModule = await RoadmapModule.create({
      _id: moduleId,
      id: moduleId,
      title,
      iconName,
      order: Number(order) || 99,
      description,
    });

    return sendSuccess(res, 'Roadmap module created successfully', newModule, 201);
  } catch (error) {
    return sendError(res, 'Error creating roadmap module', error, 500);
  }
};

const updateModule = async (req, res) => {
  try {
    const { id } = req.params;
    const module = await RoadmapModule.findOne({ _id: id });
    if (!module) {
      return sendError(res, 'Module not found', null, 404);
    }
    const updated = await RoadmapModule.findOneAndUpdate({ _id: id }, req.body, { new: true });
    return sendSuccess(res, 'Roadmap module updated successfully', updated);
  } catch (error) {
    return sendError(res, 'Error updating roadmap module', error, 500);
  }
};

const deleteModule = async (req, res) => {
  try {
    const { id } = req.params;
    const module = await RoadmapModule.findOne({ _id: id });
    if (!module) {
      return sendError(res, 'Module not found', null, 404);
    }
    // Delete associated topics for this module
    await CurriculumTopic.deleteMany({ moduleId: id });
    await RoadmapModule.deleteOne({ _id: id });
    return sendSuccess(res, 'Roadmap module and associated topics deleted successfully', { id });
  } catch (error) {
    return sendError(res, 'Error deleting roadmap module', error, 500);
  }
};

module.exports = {
  getAllModules,
  createModule,
  updateModule,
  deleteModule,
};
