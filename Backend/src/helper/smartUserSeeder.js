const bcrypt = require('bcrypt');
const User = require('../modals/User');
const UserPreference = require('../modals/UserPreference');

const smartUserSeeder = async () => {
  try {
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@lifeos.ai';
    const rawPassword = process.env.ADMIN_PASSWORD || 'admin@123';
    const hashedPassword = await bcrypt.hash(rawPassword, 10);

    const [adminUser, created] = await User.findOrCreate({
      where: { email: adminEmail },
      defaults: {
        name: 'System Admin',
        email: adminEmail,
        password: hashedPassword,
        pin: '1234',
        role: 'admin',
      },
    });

    if (!created) {
      // Ensure password and role are up to date with .env
      await adminUser.update({
        password: hashedPassword,
        role: 'admin',
      });
    }

    await UserPreference.findOrCreate({
      where: { userId: adminUser.id },
      defaults: {
        userId: adminUser.id,
        targetRole: 'System Administrator',
        careerLevel: 'Admin Console',
        focusAreas: ['Coding & DSA', 'DevOps & Cloud', 'English Fluency', 'Fitness & Energy'],
        dailyHours: 4,
        fitnessGoal: 'Build Muscle & Increase Energy',
        workoutType: 'Gym Weightlifting & Strength',
        aiPersona: 'Motivational Tech Mentor',
        onboardingCompleted: true,
      },
    });

    console.log(`✅ Admin user (${adminEmail}) seeded/synced with .env credentials.`);
  } catch (err) {
    console.warn('Smart user seeder notice:', err.message);
  }
};

module.exports = smartUserSeeder;
