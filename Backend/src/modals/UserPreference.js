const mongoose = require('mongoose');

const userPreferenceSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.Mixed, required: true },
  targetRole: { type: String, default: 'Full-Stack Web Developer' },
  careerLevel: { type: String, default: 'Intermediate (1-3 yrs experience)' },
  focusAreas: { type: Array, default: ['Coding & DSA', 'DevOps & Cloud', 'English Fluency', 'System Design & Projects'] },
  skillLevels: { type: Object, default: { dsa: 'Intermediate', devops: 'Beginner', english: 'Intermediate' } },
  dailyHours: { type: Number, default: 4 },
  targetDate: { type: String, default: '2026-12-31' },
  aiPersona: { type: String, default: 'Motivational Tech Mentor' },
  cityState: { type: String, default: '' },
  aiLanguage: { type: String, default: 'English' },
  degree: { type: String, default: '' },
  collegeName: { type: String, default: '' },
  collegeCity: { type: String, default: '' },
  educationStatus: { type: String, default: '' },
  currentSemester: { type: String, default: '' },
  graduationPeriod: { type: String, default: '' },
  hasExperience: { type: String, default: 'No' },
  experienceType: { type: String, default: 'Fresher' },
  companyName: { type: String, default: '' },
  experienceRole: { type: String, default: '' },
  experienceDuration: { type: String, default: '' },
  companyTechStack: { type: String, default: '' },
  project1Name: { type: String, default: '' },
  project1Tagline: { type: String, default: '' },
  project1Desc: { type: String, default: '' },
  project1TechStack: { type: String, default: '' },
  project1Link: { type: String, default: '' },
  project2Name: { type: String, default: '' },
  project2Desc: { type: String, default: '' },
  project2TechStack: { type: String, default: '' },
  leetcodeHandle: { type: String, default: '' },
  githubHandle: { type: String, default: '' },
  linkedinUrl: { type: String, default: '' },
  targetCompanyTier: { type: String, default: 'Product Startups' },
  weakDsaTopics: { type: Array, default: [] },
  weakDevopsTopics: { type: Array, default: [] },
  preferredTimeSlot: { type: String, default: 'Flexible' },
  onboardingCompleted: { type: Boolean, default: false }
}, {
  timestamps: true
});

module.exports = mongoose.model('UserPreference', userPreferenceSchema);
