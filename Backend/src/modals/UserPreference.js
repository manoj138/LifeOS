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
    defaultValue: ['Coding & DSA', 'DevOps & Cloud', 'English Fluency', 'System Design & Projects'],
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
  aiPersona: {
    type: DataTypes.STRING,
    defaultValue: 'Motivational Tech Mentor',
  },
  cityState: { type: DataTypes.STRING, defaultValue: '' },
  aiLanguage: { type: DataTypes.STRING, defaultValue: 'English' },
  degree: { type: DataTypes.STRING, defaultValue: '' },
  collegeName: { type: DataTypes.STRING, defaultValue: '' },
  collegeCity: { type: DataTypes.STRING, defaultValue: '' },
  educationStatus: { type: DataTypes.STRING, defaultValue: '' },
  currentSemester: { type: DataTypes.STRING, defaultValue: '' },
  graduationPeriod: { type: DataTypes.STRING, defaultValue: '' },
  hasExperience: { type: DataTypes.STRING, defaultValue: 'No' },
  experienceType: { type: DataTypes.STRING, defaultValue: 'Fresher' },
  companyName: { type: DataTypes.STRING, defaultValue: '' },
  experienceRole: { type: DataTypes.STRING, defaultValue: '' },
  experienceDuration: { type: DataTypes.STRING, defaultValue: '' },
  companyTechStack: { type: DataTypes.STRING, defaultValue: '' },
  project1Name: { type: DataTypes.STRING, defaultValue: '' },
  project1Tagline: { type: DataTypes.STRING, defaultValue: '' },
  project1Desc: { type: DataTypes.STRING, defaultValue: '' },
  project1TechStack: { type: DataTypes.STRING, defaultValue: '' },
  project1Link: { type: DataTypes.STRING, defaultValue: '' },
  project2Name: { type: DataTypes.STRING, defaultValue: '' },
  project2Desc: { type: DataTypes.STRING, defaultValue: '' },
  project2TechStack: { type: DataTypes.STRING, defaultValue: '' },
  leetcodeHandle: { type: DataTypes.STRING, defaultValue: '' },
  githubHandle: { type: DataTypes.STRING, defaultValue: '' },
  linkedinUrl: { type: DataTypes.STRING, defaultValue: '' },
  targetCompanyTier: { type: DataTypes.STRING, defaultValue: 'Product Startups' },
  weakDsaTopics: { type: DataTypes.JSON, defaultValue: [] },
  weakDevopsTopics: { type: DataTypes.JSON, defaultValue: [] },
  preferredTimeSlot: { type: DataTypes.STRING, defaultValue: 'Flexible' },
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
