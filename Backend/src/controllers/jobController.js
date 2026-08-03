const JobApplication = require('../modals/JobApplication');
const { sendSuccess, sendError } = require('../helper/responseHelper');

const getJobApplications = async (req, res) => {
  try {
    const userId = req.user ? req.user.id : 1;
    let jobs = await JobApplication.findAll({ where: { userId } });

    // Seed default jobs if empty
    if (jobs.length === 0) {
      jobs = await JobApplication.bulkCreate([
        { id: 'j1', userId, company: 'Google', role: 'Staff Frontend Architect', status: 'Interviewing', salary: '$240,000', location: 'Remote / Mountain View' },
        { id: 'j2', userId, company: 'Stripe', role: 'Senior MERN SaaS Engineer', status: 'Applied', salary: '$210,000', location: 'Remote' },
        { id: 'j3', userId, company: 'Vercel', role: 'Principal Web Infrastructure', status: 'Offer', salary: '$260,000', location: 'Remote' },
      ]);
    }

    return sendSuccess(res, 'Job applications retrieved', jobs);
  } catch (error) {
    return sendError(res, 'Error fetching job applications', error, 500);
  }
};

const createJobApplication = async (req, res) => {
  try {
    const userId = req.user ? req.user.id : 1;
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
