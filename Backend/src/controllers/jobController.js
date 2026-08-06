const JobApplication = require('../modals/JobApplication');
const { sendSuccess, sendError } = require('../helper/responseHelper');

const getJobApplications = async (req, res) => {
  try {
    const userId = req.user.id;
    const jobs = await JobApplication.findAll({ where: { userId } });
    return sendSuccess(res, 'Job applications retrieved', jobs);
  } catch (error) {
    return sendError(res, 'Error fetching job applications', error, 500);
  }
};

const createJobApplication = async (req, res) => {
  try {
    const userId = req.user.id;
    const { company, role, status, salary, location } = req.body;
    const newJob = await JobApplication.create({
      id: `job_${Date.now()}`,
      userId,
      company,
      role,
      status: status || 'Applied',
      salary: salary || '$180,000',
      location: location || 'Remote',
    });
    return sendSuccess(res, 'Job application created', newJob, 201);
  } catch (error) {
    return sendError(res, 'Error creating job application', error, 500);
  }
};

module.exports = {
  getJobApplications,
  createJobApplication,
};
