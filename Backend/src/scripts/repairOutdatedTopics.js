const CurriculumTopic = require('../modals/CurriculumTopic');
const { generateTopicContent } = require('../helper/aiGenerator');

/**
 * Scans MongoDB for any CurriculumTopic records containing outdated placeholder code
 * and regenerates them via AI.
 */
async function repairOutdatedTopics() {
  try {
    const allTopics = await CurriculumTopic.find();
    let repairedCount = 0;

    for (const topic of allTopics) {
      const code = topic.codeSnippet || '';
      const explanation = topic.conceptExplanation || '';
      const app = topic.projectApplication || '';

      const isOutdated = 
        code.includes('executeCoreLogic') || 
        explanation.includes('decoupling microservices') ||
        app.includes('high-throughput event queues') ||
        explanation.includes('Definition & Core Purpose:');

      if (isOutdated) {
        console.log(`🧹 Repairing outdated AI topic: "${topic.title || topic.topicName}" (ID: ${topic.id || topic._id})...`);
        const content = await generateTopicContent(topic.topicName || topic.title, topic.moduleId || 'js', topic.level || 'Beginner');

        await CurriculumTopic.findOneAndUpdate(
          { _id: topic._id },
          {
            title: content.title || topic.title,
            conceptExplanation: content.conceptExplanation || topic.conceptExplanation,
            codeSnippet: content.codeSnippet || topic.codeSnippet,
            projectApplication: content.projectApplication || topic.projectApplication,
            quizQuestions: content.quizQuestions || topic.quizQuestions,
            taskTitle: content.taskTitle || topic.taskTitle,
            taskDescription: content.taskDescription || topic.taskDescription,
            starterCode: content.starterCode || topic.starterCode,
            solutionCriteria: content.solutionCriteria || topic.solutionCriteria,
          }
        );

        repairedCount++;
      }
    }

    if (repairedCount > 0) {
      console.log(`✅ Successfully repaired ${repairedCount} outdated topics in MongoDB Atlas!`);
    } else {
      console.log(`✨ All topics in MongoDB Atlas are already up to date.`);
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
