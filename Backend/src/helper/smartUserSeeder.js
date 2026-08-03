const bcrypt = require('bcrypt');
const User = require('../modals/User');
const UserPreference = require('../modals/UserPreference');

const smartUserSeeder = async () => {
  try {
    const userCount = await User.count();
    if (userCount === 0) {
      console.log('🌱 Database is empty. Seeding initial primary admin candidate user...');
      const hashedPassword = await bcrypt.hash('admin123', 10);
      
      const [adminUser, created] = await User.findOrCreate({
        where: { email: 'manoj@lifeos.ai' },
        defaults: {
          name: 'Manoj Kumar Chougule',
          email: 'manoj@lifeos.ai',
          password: hashedPassword,
          pin: '1234',
          role: 'admin',
        },
      });

      if (created) {
        await UserPreference.findOrCreate({
          where: { userId: adminUser.id },
          defaults: {
            userId: adminUser.id,
            targetRole: 'Full-Stack Web Developer',
            careerLevel: 'Intermediate (1-3 yrs experience)',
            focusAreas: ['Coding & DSA', 'DevOps & Cloud', 'English Fluency', 'Fitness & Energy'],
            dailyHours: 4,
            fitnessGoal: 'Build Muscle & Increase Energy',
            workoutType: 'Gym Weightlifting & Strength',
            aiPersona: 'Motivational Tech Mentor',
            onboardingCompleted: true,
          },
        });
        console.log('✅ Initial admin user (Manoj Kumar Chougule) seeded into database.');
      }
    }
  } catch (err) {
    console.warn('Smart user seeder notice:', err.message);
  }
};

module.exports = smartUserSeeder;
