const RoadmapModule = require('../modals/RoadmapModule');

const DEFAULT_MODULES_SEED = [
  {
    id: 'js',
    title: '1. JavaScript (ES6+)',
    iconName: 'Code2',
    order: 1,
    description: 'Foundational JavaScript, scope, closures, event loop & async architecture.',
  },
  {
    id: 'react',
    title: '2. React.js',
    iconName: 'Layers',
    order: 2,
    description: 'React components, custom hooks, Virtual DOM diffing & state management.',
  },
  {
    id: 'node',
    title: '3. Node.js',
    iconName: 'Terminal',
    order: 3,
    description: 'Express web servers, async middleware pipelines, REST APIs & SQLite/MongoDB.',
  },
  {
    id: 'devops',
    title: '4. DevOps & Cloud VPS',
    iconName: 'Server',
    order: 4,
    description: 'Docker containerization, CI/CD pipelines, Nginx reverse proxy & Linux VPS management.',
  },
  {
    id: 'dsa',
    title: '5. DSA Master Studio',
    iconName: 'Binary',
    order: 5,
    description: 'Data structures, two-pointers, sliding window, recursion & algorithm optimization.',
  },
];

async function seedRoadmapModules() {
  try {
    let seededCount = 0;
    for (const moduleData of DEFAULT_MODULES_SEED) {
      const [mod, created] = await RoadmapModule.findOrCreate({
        where: { id: moduleData.id },
        defaults: moduleData,
      });
      if (created) seededCount++;
    }

    if (seededCount > 0) {
      console.log(`✅ Incremental Seeder: Successfully seeded ${seededCount} default roadmap modules.`);
    } else {
      console.log('ℹ️ Incremental Seeder: Roadmap modules up to date.');
    }
  } catch (error) {
    console.error('⚠️ Error seeding roadmap modules:', error.message);
  }
}

module.exports = { seedRoadmapModules };
