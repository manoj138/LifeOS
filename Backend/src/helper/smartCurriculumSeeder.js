const CurriculumTopic = require('../modals/CurriculumTopic');

const MASTER_CURRICULUM_TOPICS = [
  // 1. JavaScript
  {
    id: 'js-0',
    moduleId: 'js',
    title: '1.1 Variables, Scope & Temporal Dead Zone (TDZ)',
    topicName: 'Variables & TDZ',
    level: 'Beginner',
    conceptExplanation: 'In JavaScript, var, let, and const handle scope differently. let and const exist in the Temporal Dead Zone (TDZ) before declaration.',
    codeSnippet: '// Temporal Dead Zone Example\nconsole.log(a); // ReferenceError: Cannot access "a" before initialization\nlet a = 10;',
    projectApplication: 'Used across all React component state declarations and immutability controls.',
    quizQuestions: [
      {
        question: 'What happens if you access a `let` variable before declaration?',
        options: ['returns undefined', 'throws ReferenceError (TDZ)', 'returns null', 'works normally'],
        correct: 1,
      },
    ],
  },
  {
    id: 'js-1',
    moduleId: 'js',
    title: '1.2 Closures, Lexical Scope & Scope Chain',
    topicName: 'Closures & Scope',
    level: 'Intermediate',
    conceptExplanation: 'A closure is the combination of a function bundled together with references to its surrounding state (lexical environment).',
    codeSnippet: 'function outer() {\n  let count = 0;\n  return function inner() {\n    count++;\n    return count;\n  };\n}\nconst counter = outer();\nconsole.log(counter()); // 1',
    projectApplication: 'Used in custom React hooks and private state management.',
    quizQuestions: [
      {
        question: 'What is a closure in JavaScript?',
        options: ['A function having access to parent lexical scope', 'A loop control statement', 'An array method', 'A DOM query selector'],
        correct: 0,
      },
    ],
  },

  // 2. React.js
  {
    id: 'react-0',
    moduleId: 'react',
    title: '2.1 JSX Syntax & Component Architecture',
    topicName: 'JSX Syntax',
    level: 'Beginner',
    conceptExplanation: 'JSX allows writing HTML-like structure directly inside JavaScript components using Babel transformation.',
    codeSnippet: 'export const Header = () => {\n  return <h1 className="text-2xl font-bold">Hello LifeOS!</h1>;\n};',
    projectApplication: 'Fundamental syntax for all React UI components.',
    quizQuestions: [
      {
        question: 'Which property attribute is used in JSX instead of `class`?',
        options: ['class', 'className', 'styleClass', 'cssClass'],
        correct: 1,
      },
    ],
  },
  {
    id: 'react-1',
    moduleId: 'react',
    title: '2.2 useState Hook & Immutability Patterns',
    topicName: 'useState Hook',
    level: 'Beginner',
    conceptExplanation: 'useState is a Hook that allows adding React state to function components with setter trigger re-renders.',
    codeSnippet: 'const [count, setCount] = useState(0);\nconst increment = () => setCount((prev) => prev + 1);',
    projectApplication: 'Used for all interactive UI state management across LifeOS.',
    quizQuestions: [
      {
        question: 'Why should you use functional state updates `setCount(prev => prev + 1)`?',
        options: ['To ensure atomic state updates based on latest state', 'It is faster', 'It bypasses React DOM', 'Required for TypeScript'],
        correct: 0,
      },
    ],
  },

  // 3. Node.js & Express
  {
    id: 'node-0',
    moduleId: 'node',
    title: '3.1 Node.js Event Loop & Non-Blocking I/O',
    topicName: 'Event Loop & I/O',
    level: 'Intermediate',
    conceptExplanation: 'Node.js uses single-threaded event loop architecture to handle thousands of concurrent I/O operations efficiently.',
    codeSnippet: 'const fs = require("fs");\nfs.readFile("file.txt", "utf8", (err, data) => {\n  console.log(data);\n});',
    projectApplication: 'Powers the LifeOS Express backend server architecture.',
    quizQuestions: [
      {
        question: 'What handles heavy I/O tasks in Node.js?',
        options: ['Libuv thread pool', 'Call Stack', 'V8 Compiler', 'Garbage Collector'],
        correct: 0,
      },
    ],
  },

  // 4. DevOps & Cloud VPS
  {
    id: 'devops-0',
    moduleId: 'devops',
    title: '13.1 Docker Containerization & Nginx Reverse Proxy',
    topicName: 'Docker & Nginx',
    level: 'Intermediate',
    conceptExplanation: 'Docker encapsulates Node.js applications into lightweight containers while Nginx routes incoming HTTP requests.',
    codeSnippet: 'FROM node:20-alpine\nWORKDIR /app\nCOPY package*.json ./\nRUN npm install\nCOPY . .\nEXPOSE 1235\nCMD ["node", "index.js"]',
    projectApplication: 'Production Hostinger VPS deployment for LifeOS Backend.',
    quizQuestions: [
      {
        question: 'Which command exposes container port 1235 in Dockerfile?',
        options: ['PORT 1235', 'EXPOSE 1235', 'LISTEN 1235', 'OPEN 1235'],
        correct: 1,
      },
    ],
  },

  // 5. DSA Master Studio
  {
    id: 'dsa-0',
    moduleId: 'dsa',
    title: '9.1 Two Pointer Technique & Array Optimization',
    topicName: 'Two Pointers',
    level: 'Beginner',
    conceptExplanation: 'Two Pointer pattern reduces O(N^2) brute force nested loops into O(N) linear time complexity for sorted arrays.',
    codeSnippet: 'function maxArea(height) {\n  let left = 0, right = height.length - 1, max = 0;\n  while (left < right) {\n    let w = right - left;\n    let h = Math.min(height[left], height[right]);\n    max = Math.max(max, w * h);\n    if (height[left] < height[right]) left++; else right--;\n  }\n  return max;\n}',
    projectApplication: 'Algorithmic problem solving in technical interviews.',
    quizQuestions: [
      {
        question: 'What is the time complexity of the Two Pointer approach on a sorted array?',
        options: ['O(N^2)', 'O(N log N)', 'O(N)', 'O(1)'],
        correct: 2,
      },
    ],
  },
];

const smartCurriculumSeeder = async () => {
  let insertedCount = 0;
  let preservedCount = 0;

  for (const item of MASTER_CURRICULUM_TOPICS) {
    const [topic, created] = await CurriculumTopic.findOrCreate({
      where: { id: item.id },
      defaults: item, // ONLY inserted if record does NOT exist!
    });

    if (created) {
      insertedCount++;
    } else {
      preservedCount++;
    }
  }

  console.log(
    `⚡ Smart Seeder Summary: ${insertedCount} missing topics inserted, ${preservedCount} existing topics preserved UNTOUCHED.`
  );

  return {
    total: MASTER_CURRICULUM_TOPICS.length,
    inserted: insertedCount,
    preserved: preservedCount,
  };
};

module.exports = smartCurriculumSeeder;
