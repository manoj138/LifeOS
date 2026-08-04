const fetch = globalThis.fetch || require('node-fetch');

/**
 * Builds dynamic topic content based on title matching for fallback/offline mode
 */
function buildSmartFallbackContent(topicTitle, moduleId = 'js', level = 'Beginner') {
  const titleLower = topicTitle.toLowerCase();

  // 1. Variables (var, let, const)
  if (titleLower.includes('variable') || titleLower.includes('var') || titleLower.includes('let') || titleLower.includes('const')) {
    return {
      title: topicTitle,
      level: level,
      conceptExplanation: `### 📘 Concept Deep-Dive: ${topicTitle}\n\n` +
        `**Core Principles & Mechanics:**\n` +
        `In programming, a variable is a named container used to store data values in memory. In modern JavaScript, we declare variables using three keywords: \`var\`, \`let\`, and \`const\`.\n\n` +
        `**Key Differences & Rules:**\n` +
        `• **\`const\` (Constant):** Declares a block-scoped variable that **cannot be re-assigned**. Use this by default for values that shouldn't change (e.g., configurations, element references, API endpoints).\n` +
        `• **\`let\` (Re-assignable):** Declares a block-scoped variable that **can be updated/re-assigned** later. Perfect for counters, loop indices, or state that changes.\n` +
        `• **\`var\` (Legacy Function-scoped):** The older JavaScript variable keyword. It is function-scoped (or globally scoped) and suffers from hoisting issues. Avoid using \`var\` in modern code.\n\n` +
        `💡 **Pro Tip:** Always default to \`const\`. If you know the variable value needs to change later, use \`let\`. Avoid using \`var\` in modern applications.`,
      codeSnippet: `// ===============================================\n` +
        `// Practical Example: Variables (var, let, const)\n` +
        `// ===============================================\n\n` +
        `// 1. Using 'const' for fixed values\n` +
        `const appName = "LifeOS Learning System";\n` +
        `const maxUserLimit = 100;\n` +
        `console.log("App Name:", appName);\n\n` +
        `// 2. Using 'let' for values that change\n` +
        `let activeStudents = 10;\n` +
        `console.log("Initial Students:", activeStudents);\n\n` +
        `// Updating a let variable\n` +
        `activeStudents = activeStudents + 5;\n` +
        `console.log("Updated Students:", activeStudents);\n\n` +
        `// 3. Block Scope Demonstration\n` +
        `if (true) {\n` +
        `  const insideBlock = "Scoped to IF block only";\n` +
        `  console.log(insideBlock);\n` +
        `}`,
      projectApplication: `In real-world web applications (like user authentication or e-commerce carts), 'const' is used for user ID, database handles, and API URLs, while 'let' is used for shopping cart counters, form input values, and pagination state.`,
      quizQuestions: [
        { q: `What is the primary difference between 'let' and 'const'?`, a: `'const' cannot be re-assigned after initialization, whereas 'let' allows re-assignment.` },
        { q: `Why should you avoid using 'var' in modern JavaScript?`, a: `'var' is function-scoped instead of block-scoped and is subject to hoisting bugs.` }
      ],
      taskTitle: `Chapter Challenge: Variable Scoping & Assignment`,
      taskDescription: `Write a function named \`solutionTask\` that takes an initial user score, increases it by 15 points using a \`let\` variable, and returns a user profile object containing the user's name (stored in a \`const\`) and the updated score.`,
      starterCode: `// Chapter Task Starter Code\nfunction solutionTask(initialScore) {\n  // TODO 1: Declare a const 'userName' with value "Alex"\n  // TODO 2: Declare a let 'score' initialized to initialScore\n  // TODO 3: Add 15 points to 'score'\n  // TODO 4: Return object { userName, score }\n  return null;\n}`,
      solutionCriteria: `Function must return an object with correct userName string and initialScore + 15.`
    };
  }

  // 2. Functions / Arrow Functions
  if (titleLower.includes('function') || titleLower.includes('arrow') || titleLower.includes('parameter')) {
    return {
      title: topicTitle,
      level: level,
      conceptExplanation: `### 📘 Concept Deep-Dive: ${topicTitle}\n\n` +
        `**Core Principles & Mechanics:**\n` +
        `Functions are reusable blocks of code designed to perform a specific task. They accept inputs (parameters), process logic, and return an output value.\n\n` +
        `**Key Concepts:**\n` +
        `• **Function Declarations:** Traditional functions declared with the \`function\` keyword.\n` +
        `• **Arrow Functions (\`() => {}\`):** A concise ES6 syntax ideal for short functions and callbacks.\n` +
        `• **Parameters & Return Values:** Inputs passed into the function and explicit output returned using the \`return\` statement.\n\n` +
        `💡 **Pro Tip:** Keep functions small and focused on a single responsibility (Single Responsibility Principle).`,
      codeSnippet: `// ===============================================\n` +
        `// Practical Example: Functions & Arrow Functions\n` +
        `// ===============================================\n\n` +
        `// 1. Regular Function Declaration\n` +
        `function calculateTotal(price, quantity) {\n` +
        `  return price * quantity;\n` +
        `}\n\n` +
        `// 2. ES6 Arrow Function Syntax\n` +
        `const formatUserGreeting = (name) => {\n` +
        `  return \`Welcome back, \${name}!\`;\n` +
        `};\n\n` +
        `// Execution & Verification\n` +
        `const total = calculateTotal(25, 4);\n` +
        `const greeting = formatUserGreeting("Manoj");\n` +
        `console.log(greeting);\n` +
        `console.log("Total Price:", total);`,
      projectApplication: `Functions are the core building blocks of web APIs, event listeners, utility modules, and React component handlers.`,
      quizQuestions: [
        { q: `What keyword is used to output a value from a function?`, a: `The 'return' keyword.` },
        { q: `What is a key feature of ES6 Arrow Functions?`, a: `Shorter syntax and lexical binding of 'this'.` }
      ],
      taskTitle: `Chapter Challenge: Build a Calculation Function`,
      taskDescription: `Implement a function \`solutionTask(num1, num2)\` that multiplies the two numbers together and returns the result.`,
      starterCode: `// Chapter Task Starter Code\nfunction solutionTask(num1, num2) {\n  // TODO: Calculate product of num1 and num2 and return it\n  return null;\n}`,
      solutionCriteria: `Function must return num1 * num2.`
    };
  }

  // 3. Arrays / List Methods
  if (titleLower.includes('array') || titleLower.includes('map') || titleLower.includes('filter') || titleLower.includes('list')) {
    return {
      title: topicTitle,
      level: level,
      conceptExplanation: `### 📘 Concept Deep-Dive: ${topicTitle}\n\n` +
        `**Core Principles & Mechanics:**\n` +
        `Arrays store collections of data in an ordered sequence. Modern JavaScript provides powerful built-in higher-order array methods to transform, filter, and iterate through data.\n\n` +
        `**Key Array Operations:**\n` +
        `• **\`.map()\`: ** Creates a new array by applying a transformation function to every item.\n` +
        `• **\`.filter()\`: ** Returns a new array containing only items that satisfy a specific condition.\n` +
        `• **\`.push()\` / \`.pop()\`: ** Add or remove elements from an array.\n\n` +
        `💡 **Pro Tip:** Prefer immutable array methods (\`.map()\`, \`.filter()\`, \`.slice()\`) over mutating methods when working with UI state.`,
      codeSnippet: `// ===============================================\n` +
        `// Practical Example: Arrays & Transformations\n` +
        `// ===============================================\n\n` +
        `const items = [\n` +
        `  { id: 1, title: "HTML Basics", completed: true },\n` +
        `  { id: 2, title: "JavaScript Fundamentals", completed: false },\n` +
        `  { id: 3, title: "React Core", completed: true }\n` +
        `];\n\n` +
        `// 1. Filter completed items\n` +
        `const completedList = items.filter(item => item.completed);\n` +
        `console.log("Completed Topics:", completedList);\n\n` +
        `// 2. Map titles to uppercase\n` +
        `const titles = items.map(item => item.title.toUpperCase());\n` +
        `console.log("All Titles:", titles);`,
      projectApplication: `Arrays are used to render lists in UI dashboards, manage feed items in social apps, and process API payloads.`,
      quizQuestions: [
        { q: `Which array method creates a new array with elements that pass a test condition?`, a: `The .filter() method.` },
        { q: `Does .map() mutate the original array?`, a: `No, .map() returns a brand new array.` }
      ],
      taskTitle: `Chapter Challenge: Filter Active Users`,
      taskDescription: `Write a function \`solutionTask(userList)\` that filters an array of user objects and returns only users with \`active: true\`.`,
      starterCode: `// Chapter Task Starter Code\nfunction solutionTask(userList) {\n  // TODO: Use userList.filter() to return active users\n  return [];\n}`,
      solutionCriteria: `Returns an array containing only objects where active === true.`
    };
  }

  // 4. Default / Generic Topic Fallback (Student-friendly, level-aware, NO corporate buzzwords!)
  return {
    title: topicTitle,
    level: level,
    conceptExplanation: `### 📘 Concept Deep-Dive: ${topicTitle}\n\n` +
      `**Core Principles & Mechanics:**\n` +
      `Welcome to **${topicTitle}**! This topic is an essential foundation in modern development (${level} Level).\n\n` +
      `**Key Concepts to Understand:**\n` +
      `• **Definition & Core Purpose:** Understanding how ${topicTitle} fits into building clean software applications.\n` +
      `• **Practical Rules:** Syntax patterns, standard conventions, and avoiding common student pitfalls.\n` +
      `• **Real-World Relevance:** Why developers use ${topicTitle} to write readable and maintainable code.\n\n` +
      `💡 **Pro Tip:** Practice writing the code examples yourself to build muscle memory!`,
    codeSnippet: `// ===============================================\n` +
      `// Practical Example: ${topicTitle}\n` +
      `// ===============================================\n\n` +
      `function demonstrateConcept(inputData) {\n` +
      `  console.log("🚀 Executing demo for ${topicTitle}...");\n` +
      `  \n` +
      `  if (!inputData) {\n` +
      `    return { status: "ERROR", message: "Please provide valid input." };\n` +
      `  }\n` +
      `  \n` +
      `  return {\n` +
      `    topic: "${topicTitle}",\n` +
      `    inputReceived: inputData,\n` +
      `    status: "SUCCESS"\n` +
      `  };\n` +
      `}\n\n` +
      `// Execution & Verification\n` +
      `const result = demonstrateConcept({ sample: "Testing ${topicTitle}" });\n` +
      `console.log("Result:", result);`,
    projectApplication: `In practical web development, ${topicTitle} is used for organizing application logic, processing user input, and building interactive web features.`,
    quizQuestions: [
      { q: `What is the main goal of understanding ${topicTitle}?`, a: `To write clear, predictable, and functional code.` },
      { q: `What should you check first when debugging ${topicTitle}?`, a: `Verify parameter inputs, console logs, and syntax errors.` }
    ],
    taskTitle: `Chapter Challenge: ${topicTitle} Practice Task`,
    taskDescription: `Implement the function \`solutionTask(data)\` to process input data for ${topicTitle} and return a valid result object.`,
    starterCode: `// Chapter Task Starter Code\nfunction solutionTask(data) {\n  // TODO: Implement logic for ${topicTitle}\n  if (!data) return { success: false };\n  return { success: true, topic: "${topicTitle}", data };\n}`,
    solutionCriteria: `Function must return an object with success: true.`
  };
}

/**
 * Generates structured curriculum topic content using Gemini API or rich structured generator.
 * @param {string} topicTitle 
 * @param {string} moduleId 
 * @param {string} level 
 */
async function generateTopicContent(topicTitle, moduleId = 'js', level = 'Beginner') {
  const apiKey = process.env.GEMINI_API_KEY;

  const prompt = `You are a expert Computer Science Instructor.
Generate a student-friendly, clear, and comprehensive curriculum module for software engineering students.

Topic Name: "${topicTitle}"
Module Category: "${moduleId}"
Target Skill Level: "${level}"

IMPORTANT GUIDELINES:
- DO NOT use overly complicated enterprise microservice jargon for beginner topics.
- Keep explanations clear, clear visual analogies, step-by-step breakdowns, and practical real-world student context.
- Ensure code snippets are runnable JavaScript/HTML/React with clear inline comments.

Respond strictly with valid JSON only in the following format without any markdown backticks:
{
  "title": "${topicTitle}",
  "level": "${level}",
  "conceptExplanation": "Provide a step-by-step breakdown with visual analogies, core mechanics, and key takeaways.",
  "codeSnippet": "15-25 lines of runnable code with inline comments.",
  "projectApplication": "Explain how modern applications (e.g., e-commerce, social apps, web dashboards) use this specific topic.",
  "quizQuestions": [
    { "q": "Sample practice question 1", "a": "Detailed explanation answer" },
    { "q": "Sample practice question 2", "a": "Detailed explanation answer" }
  ],
  "taskTitle": "Chapter Challenge: Practical Implementation Task",
  "taskDescription": "Clear step-by-step assignment instructions for the student.",
  "starterCode": "// Starter code for student to complete\\nfunction solutionTask(data) {\\n  // TODO: Implement logic\\n}",
  "solutionCriteria": "Expected output or assertion criteria."
}`;

  if (apiKey) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 9000); // 9s timeout per topic
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { responseMimeType: 'application/json' }
        }),
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      const json = await response.json();
      const rawText = json?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (rawText) {
        const cleanedText = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
        const parsed = JSON.parse(cleanedText);
        if (parsed.conceptExplanation && parsed.codeSnippet) {
          return parsed;
        }
      }
    } catch (err) {
      console.warn('Gemini API call failed or rate limited, falling back to smart structured generator:', err.message);
    }
  }

  // Smart Dynamic Generator (Ensures system never crashes and returns accurate topic-specific material)
  return buildSmartFallbackContent(topicTitle, moduleId, level);
}

module.exports = {
  generateTopicContent
};

