const { DataTypes } = require('sequelize');
const sequelize = require('../config/sqliteDB');
const User = require('./User');

const UserPreference = sequelize.define('UserPreference', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
  },
  targetRole: {
    type: DataTypes.STRING,
    defaultValue: 'Full-Stack Web Developer',
  },
  careerLevel: {
    type: DataTypes.STRING,
    defaultValue: 'Intermediate (1-3 yrs experience)',
  },
  focusAreas: {
    type: DataTypes.JSON,
    defaultValue: ['Coding & DSA', 'DevOps & Cloud', 'English Fluency', 'Fitness & Energy'],
  },
  skillLevels: {
    type: DataTypes.JSON,
    defaultValue: { dsa: 'Intermediate', devops: 'Beginner', english: 'Intermediate' },
  },
  dailyHours: {
    type: DataTypes.INTEGER,
    defaultValue: 4,
  },
  targetDate: {
    type: DataTypes.STRING,
    defaultValue: '2026-12-31',
  },
  fitnessGoal: {
    type: DataTypes.STRING,
    defaultValue: 'Build Muscle & Increase Energy',
  },
  workoutType: {
    type: DataTypes.STRING,
    defaultValue: 'Gym Weightlifting & Strength',
  },
  aiPersona: {
    type: DataTypes.STRING,
    defaultValue: 'Motivational Tech Mentor',
  },
  cityState: { type: DataTypes.STRING, defaultValue: 'Pune, Maharashtra' },
  aiLanguage: { type: DataTypes.STRING, defaultValue: 'English' },
  degree: { type: DataTypes.STRING, defaultValue: 'B.E. Computer Science' },
  collegeName: { type: DataTypes.STRING, defaultValue: 'COEP Technological University' },
  collegeCity: { type: DataTypes.STRING, defaultValue: 'Pune' },
  educationStatus: { type: DataTypes.STRING, defaultValue: 'Completed' },
  currentSemester: { type: DataTypes.STRING, defaultValue: 'Final Year' },
  graduationPeriod: { type: DataTypes.STRING, defaultValue: '6 Months Ago' },
  hasExperience: { type: DataTypes.STRING, defaultValue: 'No' },
  experienceType: { type: DataTypes.STRING, defaultValue: 'Fresher' },
  companyName: { type: DataTypes.STRING, defaultValue: '' },
  experienceRole: { type: DataTypes.STRING, defaultValue: '' },
  experienceDuration: { type: DataTypes.STRING, defaultValue: '' },
  companyTechStack: { type: DataTypes.STRING, defaultValue: '' },
  project1Name: { type: DataTypes.STRING, defaultValue: 'E-Commerce Platform' },
  project1Tagline: { type: DataTypes.STRING, defaultValue: 'Scalable Shopping Platform' },
  project1Desc: { type: DataTypes.STRING, defaultValue: 'Full-stack application with Stripe integration and coupon engine.' },
  project1TechStack: { type: DataTypes.STRING, defaultValue: 'React, Node.js, Express, MongoDB' },
  project1Link: { type: DataTypes.STRING, defaultValue: 'https://github.com' },
  project2Name: { type: DataTypes.STRING, defaultValue: 'LifeOS AI Studio' },
  project2Desc: { type: DataTypes.STRING, defaultValue: 'AI Teleprompter & Personal Growth OS.' },
  project2TechStack: { type: DataTypes.STRING, defaultValue: 'React, Tailwind, Express, SQLite' },
  leetcodeHandle: { type: DataTypes.STRING, defaultValue: '' },
  githubHandle: { type: DataTypes.STRING, defaultValue: '' },
  linkedinUrl: { type: DataTypes.STRING, defaultValue: '' },
  targetCompanyTier: { type: DataTypes.STRING, defaultValue: 'Product Startups & High Growth Firms' },
  weakDsaTopics: { type: DataTypes.JSON, defaultValue: ['Dynamic Programming', 'Graphs'] },
  weakDevopsTopics: { type: DataTypes.JSON, defaultValue: ['Kubernetes', 'CI/CD Pipelines'] },
  preferredTimeSlot: { type: DataTypes.STRING, defaultValue: 'Night Owl (8 PM - 12 AM)' },
  onboardingCompleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
}, {
  timestamps: true,
});

User.hasOne(UserPreference, { foreignKey: 'userId', as: 'preferences' });
UserPreference.belongsTo(User, { foreignKey: 'userId', as: 'user' });

module.exports = UserPreference;
