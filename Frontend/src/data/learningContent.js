// Deep, handcrafted topic-specific learning content repository for beginners & advanced learners
// Aggregates modular topic packs (JavaScript, React, Backend, DevOps, DSA)
// Enhances fallbacks with dynamic, rich technical mechanics and realistic bad vs good code examples.

import { jsTopics } from './learning/jsTopics';
import { reactTopics } from './learning/reactTopics';
import { backendTopics } from './learning/backendTopics';
import { devopsTopics } from './learning/devopsTopics';

export const learningContent = {
  ...jsTopics,
  ...reactTopics,
  ...backendTopics,
  ...devopsTopics
};

// Advanced dynamic generator for topics that do not have handcrafted modules yet
export const getFallbackTopicContent = (lesson) => {
  if (!lesson) return null;
  const name = lesson.topicName || lesson.title;
  const id = lesson.id || '';

  // Determine difficulty level dynamically if not specified
  let difficulty = "Beginner";
  if (id.includes("js-2") || id.includes("react-1") || id.includes("express") || id.includes("car")) {
    difficulty = "Intermediate";
  } else if (id.includes("node-6") || id.includes("mongo-5") || id.includes("auth-1") || id.includes("dev")) {
    difficulty = "Advanced";
  }

  // Domain-specific customization for fallback content
  let moduleDomain = "Web Architecture & Full Stack Development";
  if (id.startsWith("js")) moduleDomain = "JavaScript ES6+ Engine Mechanics";
  else if (id.startsWith("react")) moduleDomain = "React Virtual DOM & State Rendering";
  else if (id.startsWith("node")) moduleDomain = "Node.js Event Loop & C++ Binding Core";
  else if (id.startsWith("express")) moduleDomain = "Express.js REST Pipeline & Controllers";
  else if (id.startsWith("mongo")) moduleDomain = "MongoDB B-Tree Collections & Indexing";
  else if (id.startsWith("auth")) moduleDomain = "Stateless JWT & Cryptographic Auth";
  else if (id.startsWith("dev")) moduleDomain = "Linux VPS, Nginx & Cloud Containerization";

  return {
    topicId: lesson.id,
    title: lesson.title,
    difficulty: difficulty,
    estimatedTime: "15 mins",
    summary: `Complete beginner-friendly practical guide explaining ${name} in ${moduleDomain}.`,
    analogy: `🏠 Real-World Analogy (मराठीत / In Simple Terms):\nThink of ${name} like a tool in your everyday toolbox. Just like a screwdriver is designed for turning screws without damaging the material, ${name} provides clear rules and logic to make your web application interactive, predictable, and easy to understand.`,
    howItWorks: `1. Purpose & Core Logic:
   - ${name} allows you to write clean, organized, and reusable code for building modern web applications.

2. Step-by-Step Learning Breakdown:
   - Understand the basic syntax and rules of ${name}.
   - Practice writing small functions or components to test how inputs turn into outputs.
   - Use browser console or developer tools to inspect and verify the behavior step by step.

3. Real-World Web Standard:
   - Practical web applications (like user dashboards, shopping carts, and login screens) rely on ${name} to deliver smooth user experiences.`,
    badCode: `// ❌ UNOPTIMIZED PATTERN:
// Example of writing unorganized code without clean structure

function basicHandler() {
  // Hardcoded or unvalidated values
  let data = "Raw input data";
  console.log("Processing:", data);
  return data;
}`,
    goodCode: `// ✅ RECOMMENDED CLEAN PATTERN:
// Clean, structured implementation for ${name}

function solutionTask(inputData) {
  if (!inputData) {
    return { success: false, message: "Please provide valid input data." };
  }

  console.log("✅ Processing ${name} with valid state:", inputData);
  return {
    success: true,
    topic: "${name}",
    result: inputData
  };
}`,
    realWorldUse: `Used across modern frontend and backend web applications (like React dashboards, e-commerce stores, and REST APIs) to manage user input, application state, and dynamic UI updates.`,
    keyTakeaways: [
      `${name} is a fundamental concept for every web developer to master.`,
      "Writing clean, predictable code prevents bugs and makes your application easy to maintain.",
      "Practice building small working examples to strengthen your understanding."
    ],
    quiz: [
      {
        question: `What is the primary technical benefit of using ${name} correctly?`,
        options: [
          "Ensures predictable code execution, higher performance, and clean architecture",
          "It automatically bypasses all database security rules",
          "It eliminates the need for modern web browsers",
          "It forces JavaScript to execute synchronously only"
        ],
        correctIndex: 0,
        explanation: `Properly implementing ${name} ensures scalable, bug-free, and maintainable software architecture.`
      },
      {
        question: `Where does ${name} fit into enterprise software architecture?`,
        options: [
          "Only in design files",
          `Within ${moduleDomain} to maintain robust data flow and security`,
          "Only when running legacy Internet Explorer",
          "It is completely optional and never used in real projects"
        ],
        correctIndex: 1,
        explanation: `${name} forms a core component of modern enterprise application architecture.`
      }
    ],
    practiceCode: `// Interactive Code Sandbox for ${name}
function test${name.replace(/[^a-zA-Z0-9]/g, '')}() {
  console.log("=== Testing ${name} Execution ===");
  const testPayload = {
    topic: "${name}",
    domain: "${moduleDomain}",
    status: "Active Learning - Mastered"
  };
  
  console.log("Execution Result Payload:", testPayload);
  return testPayload;
}

test${name.replace(/[^a-zA-Z0-9]/g, '')}();`
  };
};
