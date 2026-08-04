const CurriculumTopic = require('../modals/CurriculumTopic');

const DEFAULT_CURRICULUM_SEED = [
  // JS Topics
  {
    id: 'js-0',
    moduleId: 'js',
    title: '1.1 Variables, Scope & Temporal Dead Zone (TDZ)',
    topicName: 'Variables & TDZ',
    level: 'Beginner',
    conceptExplanation: 'In JavaScript, var, let, and const handle scope differently. let and const exist in the Temporal Dead Zone (TDZ) before declaration.',
    codeSnippet: '// Temporal Dead Zone Example\nconsole.log(a); // ReferenceError: Cannot access "a" before initialization\nlet a = 10;',
    projectApplication: 'Used across all React component state declarations and immutability controls.',
    taskTitle: 'Fix Temporal Dead Zone Bug',
    taskDescription: 'Refactor variable declarations to prevent TDZ reference errors.',
    starterCode: 'console.log(myVar);\nlet myVar = "Hello World";',
    solutionCriteria: 'Declare variable before accessing it.',
  },
  {
    id: 'js-1',
    moduleId: 'js',
    title: '1.2 Closures, Lexical Scope & Private Variables',
    topicName: 'Closures & Scope',
    level: 'Beginner',
    conceptExplanation: 'A closure is the combination of a function bundled together with references to its surrounding state (lexical environment).',
    codeSnippet: 'function createCounter() {\n  let count = 0;\n  return () => ++count;\n}\nconst counter = createCounter();\nconsole.log(counter()); // 1',
    projectApplication: 'Used for private data encapsulation and custom React hooks state mechanisms.',
    taskTitle: 'Create a Private Counter Closure',
    taskDescription: 'Implement a closure function that encapsulates a private count variable.',
    starterCode: 'function makeCounter() {\n  // Implement private counter logic\n}',
    solutionCriteria: 'Return function that increments and returns internal count variable.',
  },
  {
    id: 'js-2',
    moduleId: 'js',
    title: '1.3 Promises, Async/Await & Event Loop Architecture',
    topicName: 'Promises & Async/Await',
    level: 'Intermediate',
    conceptExplanation: 'JavaScript relies on an event loop architecture where asynchronous tasks are pushed to Microtask (Promises) and Macrotask queues.',
    codeSnippet: 'async function fetchData() {\n  try {\n    const res = await fetch("https://api.example.com/data");\n    const data = await res.json();\n    return data;\n  } catch (err) {\n    console.error("Fetch error:", err);\n  }\n}',
    projectApplication: 'Used for all API requests and async database operations in Node.js & React.',
    taskTitle: 'Build a Safe Async Fetch Wrapper',
    taskDescription: 'Write an async function that safely handles API response errors.',
    starterCode: 'async function safeFetch(url) {\n  // TODO: Add try/catch block and fetch handling\n}',
    solutionCriteria: 'Return payload on success or error object on failure.',
  },

  // React Topics
  {
    id: 'react-0',
    moduleId: 'react',
    title: '2.1 Component Lifecycle, JSX & Immutability Rules',
    topicName: 'React Components & JSX',
    level: 'Beginner',
    conceptExplanation: 'React components are pure functions of props and state. Immutability ensures predictable re-renders and virtual DOM diffing.',
    codeSnippet: 'import React, { useState } from "react";\n\nexport const UserCard = ({ name }) => {\n  const [clicks, setClicks] = useState(0);\n  return <button onClick={() => setClicks(c => c + 1)}>{name}: {clicks}</button>;\n};',
    projectApplication: 'Core foundational component pattern used in all React frontend web applications.',
    taskTitle: 'Build a Counter Component',
    taskDescription: 'Create a functional React component with state increment handling.',
    starterCode: 'export function Counter() {\n  // Implement React state counter\n}',
    solutionCriteria: 'Component renders button and increments count state on click.',
  },

  // Node Topics
  {
    id: 'node-0',
    moduleId: 'node',
    title: '3.1 Express Middleware, Routing & Async Error Handling',
    topicName: 'Express Routing & Middleware',
    level: 'Intermediate',
    conceptExplanation: 'Express apps pipeline incoming HTTP requests through a chain of middleware functions (req, res, next).',
    codeSnippet: 'const express = require("express");\nconst app = express();\n\napp.use(express.json());\napp.get("/api/health", (req, res) => {\n  res.json({ status: "OK" });\n});',
    projectApplication: 'Backend API routing foundation for microservices and monolithic APIs.',
    taskTitle: 'Write Custom Auth Middleware',
    taskDescription: 'Build an Express middleware function that checks for Authorization header.',
    starterCode: 'function authMiddleware(req, res, next) {\n  // Implement auth header check\n}',
    solutionCriteria: 'Call next() if token exists or return 401 response.',
  },

  // DevOps Topics
  {
    id: 'devops-0',
    moduleId: 'devops',
    title: '4.1 Docker Containerization & Multi-Stage Builds',
    topicName: 'Docker Containers',
    level: 'Advanced',
    conceptExplanation: 'Docker containers package software into standardized units for development, shipment, and deployment.',
    codeSnippet: 'FROM node:18-alpine AS builder\nWORKDIR /app\nCOPY package*.json ./\nRUN npm ci\nCOPY . .\nCMD ["npm", "start"]',
    projectApplication: 'Production application deployment pipeline on Cloud VPS and Kubernetes.',
    taskTitle: 'Write a Production Dockerfile',
    taskDescription: 'Create a lightweight Dockerfile for a Node.js web server.',
    starterCode: '# Write Dockerfile steps\nFROM node:18-alpine',
    solutionCriteria: 'Set working directory, copy dependencies, and define start command.',
  },

  // DSA Topics
  {
    id: 'dsa-0',
    moduleId: 'dsa',
    title: '5.1 Two Pointers Technique & Sliding Window Pattern',
    topicName: 'Two Pointers & Sliding Window',
    level: 'Intermediate',
    conceptExplanation: 'Two pointers and sliding window reduce runtime complexity from O(N^2) to linear O(N) when operating on arrays or strings.',
    codeSnippet: 'function maxSubArraySum(arr, k) {\n  let maxSum = 0, tempSum = 0;\n  for (let i = 0; i < k; i++) maxSum += arr[i];\n  tempSum = maxSum;\n  for (let i = k; i < arr.length; i++) {\n    tempSum = tempSum - arr[i - k] + arr[i];\n    maxSum = Math.max(maxSum, tempSum);\n  }\n  return maxSum;\n}',
    projectApplication: 'Used in rate limiters, audio processing buffers, and stream search algorithms.',
    taskTitle: 'Implement Sliding Window Maximum',
    taskDescription: 'Calculate the maximum sum of contiguous subarray of size K.',
    starterCode: 'function maxSubarray(arr, k) {\n  // Implement sliding window\n}',
    solutionCriteria: 'Return maximum sum integer in linear time O(N).',
  },
];

async function seedCurriculumTopics() {
  try {
    let seededCount = 0;

    for (const topicData of DEFAULT_CURRICULUM_SEED) {
      const [topic, created] = await CurriculumTopic.findOrCreate({
        where: { id: topicData.id },
        defaults: topicData,
      });

      if (created) {
        seededCount++;
      }
    }

    if (seededCount > 0) {
      console.log(`✅ Incremental Seeder: Successfully seeded ${seededCount} new default curriculum topics.`);
    } else {
      console.log('ℹ️ Incremental Seeder: Curriculum topics already up to date.');
    }
  } catch (error) {
    console.error('⚠️ Error seeding curriculum topics:', error.message);
  }
}

module.exports = { seedCurriculumTopics };
