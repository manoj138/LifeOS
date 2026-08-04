const CurriculumTopic = require('../modals/CurriculumTopic');
const { generateTopicContent } = require('../helper/aiGenerator');

/**
 * Scans database.sqlite for any CurriculumTopic records containing outdated placeholder code
 * (like 'executeCoreLogic' or generic enterprise microservice buzzwords) and regenerates them.
 */
async function repairOutdatedTopics() {
  try {
    const allTopics = await CurriculumTopic.findAll();
    let repairedCount = 0;

    for (const topic of allTopics) {
      const code = topic.codeSnippet || '';
      const explanation = topic.conceptExplanation || '';
      const app = topic.projectApplication || '';

      const isOutdated = 
        code.includes('executeCoreLogic') || 
        explanation.includes('decoupling microservices') ||
        app.includes('high-throughput event queues');

      if (isOutdated) {
        console.log(`🧹 Repairing outdated AI topic: "${topic.title || topic.topicName}" (ID: ${topic.id})...`);
        const content = await generateTopicContent(topic.topicName || topic.title, topic.moduleId || 'js', topic.level || 'Beginner');

        await topic.update({
          title: content.title || topic.title,
          conceptExplanation: content.conceptExplanation || topic.conceptExplanation,
          codeSnippet: content.codeSnippet || topic.codeSnippet,
          projectApplication: content.projectApplication || topic.projectApplication,
          quizQuestions: content.quizQuestions || topic.quizQuestions,
          taskTitle: content.taskTitle || topic.taskTitle,
          taskDescription: content.taskDescription || topic.taskDescription,
          starterCode: content.starterCode || topic.starterCode,
          solutionCriteria: content.solutionCriteria || topic.solutionCriteria,
        });

        repairedCount++;
      }
    }

    if (repairedCount > 0) {
      console.log(`✅ Successfully repaired ${repairedCount} outdated topics in database.sqlite!`);
    } else {
      console.log(`✨ All topics in database.sqlite are already up to date.`);
    }

    return repairedCount;
  } catch (error) {
    console.error('Error repairing outdated topics:', error);
    return 0;
  }
}

module.exports = {
  repairOutdatedTopics
};
