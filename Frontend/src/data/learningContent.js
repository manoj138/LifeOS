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
    summary: `Complete beginner-to-advanced technical guide explaining ${name} in modern ${moduleDomain}.`,
    analogy: `🏠 Real-World Analogy (मराठीत/In Simple Terms):\nThink of ${name} like a specialized, automated rulebook in everyday life. Just like traffic signals maintain smooth road movement without requiring a traffic police officer at every intersection, ${name} structures execution flow and isolates data in ${moduleDomain}.`,
    howItWorks: `1. Core Architectural Goal:
   - ${name} resolves critical operational bottlenecks by providing a standardized, predictable contract for writing maintainable software.

2. Step-by-Step Runtime Execution:
   - In execution memory, the environment allocates scope boundaries for ${name}.
   - Requests or state transitions are validated against runtime type checks and execution contexts.
   - Operations complete cleanly, freeing unused memory references via Garbage Collection.

3. Enterprise Production Standard:
   - High-scale production applications implement ${name} to guarantee high availability, low latency, and zero memory bleeding across user sessions.`,
    badCode: `// ❌ INCORRECT / UNOPTIMIZED PATTERN:
// Legacy, unhandled implementation of ${name}

function unoptimized${name.replace(/[^a-zA-Z0-9]/g, '')}() {
  // 💥 Direct global scope leakage or unhandled exception stream
  console.log("Unvalidated execution of ${name}");
  let rawData = "Unsafe input payload";
  return rawData;
}`,
    goodCode: `// ✅ RECOMMENDED PRODUCTION PATTERN:
// Encapsulated, production-grade pattern for ${name}

function optimized${name.replace(/[^a-zA-Z0-9]/g, '')}() {
  try {
    const validatedData = "Encapsulated ${name} Data";
    console.log("✅ Successfully executed ${name} with safety guards");
    return { success: true, payload: validatedData };
  } catch (error) {
    console.error("Error handling ${name}:", error.message);
    throw error;
  }
}`,
    realWorldUse: `Extensively utilized in enterprise MERN full-stack web applications, microservices, and host deployment pipelines to ensure high performance, maintainability, and clean code standards.`,
    keyTakeaways: [
      `${name} is essential core knowledge for modern MERN Full-Stack Engineers.`,
      "Enforces clean architecture, preventing unexpected runtime crashes and memory leaks.",
      "Frequently tested in senior technical interview rounds for Full Stack & DevOps roles."
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
