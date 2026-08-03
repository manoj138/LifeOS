// Helper utility for LearningHub progress persistence & level unlocking logic

const STORAGE_KEY = 'lifeos_learning_hub_progress_v2';

export const loadLearningProgress = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      return JSON.parse(data);
    }
  } catch (err) {
    console.error("Failed to load learning progress from localStorage:", err);
  }

  // Default initial progress state
  return {
    completedLessons: ['js-0'], // Starts with js-0 completed or first topic unlocked
    passedQuizzes: { 'js-0': 100 },
    lastActiveModule: 'js',
    lastActiveLessonId: 'js-0'
  };
};

export const saveLearningProgress = (progressState) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progressState));
  } catch (err) {
    console.error("Failed to save learning progress to localStorage:", err);
  }
};

/**
 * Checks whether a topic is unlocked for the user.
 * Rule:
 * 1. Topic 0 of any module is unlocked by default if previous level/module prerequisites are met.
 * 2. Topic N is unlocked ONLY IF Topic N-1 in the module is marked completed (or previous level is finished).
 */
export const isTopicUnlocked = (topic, moduleLessons, completedLessons) => {
  if (!topic || !moduleLessons || moduleLessons.length === 0) return true;

  const topicIndex = moduleLessons.findIndex(l => l.id === topic.id);
  if (topicIndex <= 0) return true; // First topic in a module is always accessible

  // Topic N requires Topic N-1 to be completed
  const previousTopic = moduleLessons[topicIndex - 1];
  return completedLessons.includes(previousTopic.id);
};

/**
 * Checks whether a difficulty level (e.g. Intermediate, Advanced) is unlocked in a module.
 * Beginner: Always unlocked.
 * Intermediate: Unlocked ONLY IF ALL Beginner topics in that module are completed.
 * Advanced: Unlocked ONLY IF ALL Intermediate topics in that module are completed.
 */
export const isLevelUnlocked = (level, moduleLessons, completedLessons) => {
  if (!level || level === 'Beginner' || level === 'all') return true;

  if (level === 'Intermediate') {
    const beginnerLessons = moduleLessons.filter(l => l.level === 'Beginner');
    if (beginnerLessons.length === 0) return true;
    return beginnerLessons.every(l => completedLessons.includes(l.id));
  }

  if (level === 'Advanced') {
    const intermediateLessons = moduleLessons.filter(l => l.level === 'Intermediate');
    if (intermediateLessons.length === 0) return true;
    return intermediateLessons.every(l => completedLessons.includes(l.id));
  }

  return true;
};
