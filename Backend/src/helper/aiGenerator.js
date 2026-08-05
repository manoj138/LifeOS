const fetch = globalThis.fetch || require('node-fetch');

/**
 * Builds dynamic topic content based on title matching for fallback/offline mode
 */
function buildSmartFallbackContent(topicTitle, moduleId = 'js', level = 'Beginner') {
  const titleLower = topicTitle.toLowerCase();

  // 0. Introduction to JavaScript / JS Fundamentals
  if (titleLower.includes('introduction to javascript') || titleLower.includes('intro to javascript') || titleLower.includes('js basics') || titleLower.includes('what is javascript') || titleLower === 'javascript' || titleLower.includes('javascript intro')) {
    return {
      title: topicTitle,
      level: level,
      conceptExplanation: `### 📘 Concept Deep-Dive: Introduction to JavaScript\n\n` +
        `**1. 🎯 Overview & Fundamental Purpose:**\n` +
        `JavaScript is a lightweight, interpreted (or JIT-compiled) programming language with first-class functions. It is the primary scripting language of the web, responsible for adding dynamic behavior, interactivity, and logic to web pages alongside HTML and CSS.\n\n` +
        `**2. ⚙️ Step-by-Step Execution Mechanics:**\n` +
        `• **Step 1: Parsing & Compilation:** The JavaScript engine (e.g. V8) parses source code into an Abstract Syntax Tree (AST) and compiles it to bytecode.\n` +
        `• **Step 2: Execution Context Creation:** Global memory space is allocated for variables and functions before code executes.\n` +
        `• **Step 3: Event Loop Dispatch:** Asynchronous tasks (timers, fetch calls, click listeners) are queued and executed on the single-threaded call stack.\n\n` +
        `**3. 📐 Core Mechanics to Master:**\n` +
        `• **Client & Server Execution:** Runs in browsers and backend runtimes (Node.js).\n` +
        `• **Dynamic Typing:** Variables hold values of any data type without strict declarations.\n` +
        `• **Event-Driven Architecture:** Listens to user interactions and updates UI seamlessly.\n\n` +
        `💡 **Pro Tip:** Master pure JavaScript concepts (variables, arrays, functions, promises) before learning UI frameworks like React.`,
      codeSnippet: `// ===============================================\n` +
        `// Practical Example: Introduction to JavaScript\n` +
        `// ===============================================\n\n` +
        `// 1. Outputting text to the developer console\n` +
        `console.log("🚀 Hello World from JavaScript!");\n\n` +
        `// 2. Simple top-level variables & arithmetic\n` +
        `const platformName = "LifeOS Platform";\n` +
        `const year = 2026;\n` +
        `console.log("Welcome to " + platformName + " (" + year + ")");`,
      projectApplication: `JavaScript powers 98% of all websites on the internet. It handles form validations, powers interactive web applications (React, Vue), and builds backend REST APIs (Node.js/Express).`,
      quizQuestions: [
        { q: `What role does JavaScript play in modern web development?`, a: `It provides dynamic behavior, user interaction, and application logic to web pages.` },
        { q: `Where can JavaScript code be executed?`, a: `In web browsers and on backend servers via the Node.js runtime.` }
      ],
      taskTitle: `Chapter Challenge: Output Message to Console`,
      taskDescription: `Use console.log() to print "Hello World from JavaScript!" to the console.`,
      starterCode: `// Chapter Task Starter Code\n// TODO: Use console.log to print "Hello World from JavaScript!"\nconsole.log("Hello World from JavaScript!");`,
      solutionCriteria: `Code must execute console.log with expected text.`
    };
  }

  // 1. Variables (var, let, const)
  if (titleLower.includes('variable') || titleLower.includes('var') || titleLower.includes('let') || titleLower.includes('const')) {
    return {
      title: topicTitle,
      level: level,
      conceptExplanation: `### 📘 Concept Deep-Dive: ${topicTitle}\n\n` +
        `**1. 🎯 Overview & Fundamental Purpose:**\n` +
        `In programming, a variable is a named container in memory used to hold data values. Modern JavaScript uses three declaration keywords: \`const\`, \`let\`, and \`var\`.\n\n` +
        `**2. ⚙️ Step-by-Step Scoping Mechanics:**\n` +
        `• **Step 1: Allocation & Hoisting:** \`const\` and \`let\` are hoisted into the Temporal Dead Zone (TDZ) and cannot be accessed before declaration. \`var\` is initialized as \`undefined\`.\n` +
        `• **Step 2: Assignment:** \`const\` requires initialization upon declaration and prevents re-assignment. \`let\` allows re-assignment over time.\n` +
        `• **Step 3: Block Scope Lifetime:** \`const\` and \`let\` exist only inside the nearest curly braces \`{}\`. \`var\` ignores block scope and leaks to function/global scope.\n\n` +
        `**3. 📐 Usage Rules:**\n` +
        `• **\`const\` (Default):** Use for configurations, imports, DOM elements, and fixed references.\n` +
        `• **\`let\` (State):** Use for counters, loop indices, and values that mutate.\n` +
        `• **\`var\` (Legacy):** Avoid using \`var\` in modern codebase to prevent scope leakage.\n\n` +
        `💡 **Pro Tip:** Always default to \`const\`. Only change to \`let\` when you know the variable value needs to be re-assigned.`,
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
      projectApplication: `In real-world applications (like e-commerce carts), 'const' is used for user IDs, database connection strings, and API URLs, while 'let' is used for cart totals, input values, and pagination state.`,
      quizQuestions: [
        { q: `What is the primary difference between 'let' and 'const'?`, a: `'const' cannot be re-assigned after initialization, whereas 'let' allows re-assignment.` },
        { q: `Why should you avoid using 'var' in modern JavaScript?`, a: `'var' is function-scoped instead of block-scoped and is subject to hoisting bugs.` }
      ],
      taskTitle: `Chapter Challenge: Variable Scoping & Reassignment`,
      taskDescription: `Declare a const variable 'userName' set to "Alex", a let variable 'score' set to 10, add 15 points to 'score', and log both variables.`,
      starterCode: `// Chapter Task Starter Code\n// TODO 1: Declare a const 'userName' with value "Alex"\nconst userName = "Alex";\n\n// TODO 2: Declare a let 'score' initialized to 10\nlet score = 10;\n\n// TODO 3: Add 15 points to 'score'\nscore = score + 15;\n\n// TODO 4: Log userName and score\nconsole.log(userName, score);`,
      solutionCriteria: `Code must declare const userName and update let score correctly.`
    };
  }

  // 2. Conditional Statements (if, else, switch)
  if (titleLower.includes('conditional') || titleLower.includes('if') || titleLower.includes('switch') || titleLower.includes('condition')) {
    return {
      title: topicTitle,
      level: level,
      conceptExplanation: `### 📘 Concept Deep-Dive: Conditional Statements (if, else, switch)\n\n` +
        `**1. 🎯 Overview & Fundamental Purpose:**\n` +
        `Conditional statements enable software programs to make dynamic decisions based on data evaluated at runtime. They direct the flow of execution by evaluating expressions into boolean values (\`true\` or \`false\`).\n\n` +
        `**2. ⚙️ Step-by-Step Execution Mechanics:**\n` +
        `• **Step 1: Expression Evaluation:** The engine evaluates the condition inside \`if (condition)\` into a boolean. Truthy values execute the block; falsy values (\`false\`, \`0\`, \`""\`, \`null\`, \`undefined\`, \`NaN\`) bypass it.\n` +
        `• **Step 2: Sequential Branch Selection (\`if...else if...else\`):** The JavaScript engine evaluates conditions sequentially top-to-bottom. As soon as it encounters a \`true\` condition, it executes that specific block and skips all remaining branches.\n` +
        `• **Step 3: Multi-Value Direct Equality (\`switch\`):** When comparing a single variable against fixed target values, \`switch(val)\` performs strict equality (\`===\`) matching against each \`case\`. Use \`break\` to prevent falling through to subsequent cases.\n\n` +
        `**3. 📐 Syntax Patterns & Rules:**\n` +
        `• **Ternary Operator (\`condition ? a : b\`):** Ideal for concise inline assignment.\n` +
        `• **Guard Clauses:** Return early at the top of functions for invalid inputs to eliminate deeply nested code blocks.\n` +
        `• **Strict Equality (\`===\`):** Always use \`===\` instead of \`==\` to prevent unexpected implicit type conversion.\n\n` +
        `**4. ⚠️ Common Pitfalls to Avoid:**\n` +
        `• Forgetting the \`break\` statement in \`switch\` blocks, causing unexpected cascading code execution.\n` +
        `• Accidentally writing assignment (\`if (x = 5)\`) instead of comparison (\`if (x === 5)\`).\n` +
        `• Creating deep nested \`if\` blocks ("arrow anti-pattern") that hurt code readability.\n\n` +
        `💡 **Real-World Pro Tip:** Use guard clauses to exit early on error conditions, keeping your main function logic flat and clean!`,
      codeSnippet: `// ===============================================\n` +
        `// Practical Example: Conditional Statements (if, else, switch)\n` +
        `// ===============================================\n\n` +
        `// 1. Guard Clause Pattern & if/else logic\n` +
        `function checkUserAccess(user) {\n` +
        `  if (!user) {\n` +
        `    return "Access Denied: No user record found.";\n` +
        `  }\n\n` +
        `  if (user.role === "admin") {\n` +
        `    return "Full Admin Portal Granted";\n` +
        `  } else if (user.role === "editor") {\n` +
        `    return "Editor Dashboard Granted";\n` +
        `  } else {\n` +
        `    return "Standard Student Access";\n` +
        `  }\n` +
        `}\n\n` +
        `// 2. Switch Statement Pattern for Status Codes\n` +
        `function getOrderStatusLabel(statusCode) {\n` +
        `  switch (statusCode) {\n` +
        `    case "PENDING":\n` +
        `      return "Order is awaiting processing.";\n` +
        `    case "SHIPPED":\n` +
        `      return "Package is out for delivery!";\n` +
        `    case "DELIVERED":\n` +
        `      return "Order has arrived safely.";\n` +
        `    default:\n` +
        `      return "Unknown order status.";\n` +
        `  }\n` +
        `}\n\n` +
        `// Execution & Verification\n` +
        `console.log(checkUserAccess({ role: "admin" }));\n` +
        `console.log(getOrderStatusLabel("SHIPPED"));`,
      projectApplication: `Conditional statements power user authentication checks, UI theme toggles, form validation warnings, and authorization routing in web applications.`,
      quizQuestions: [
        { q: `What happens in a 'switch' statement if you omit the 'break' keyword at the end of a matching case?`, a: `Execution continues into the next case block regardless of whether its condition matches (known as fall-through behavior).` },
        { q: `Why are Guard Clauses preferred over deep nested 'if' statements?`, a: `Guard clauses handle early returns at the start of a function, keeping the main happy-path code clean and readable.` }
      ],
      taskTitle: `Chapter Challenge: User Authorization Decision Matrix`,
      taskDescription: `Write a function \`solutionTask(user)\` that evaluates a user object. If \`user.isBanned\` is true, return \`"Banned"\`. Else if \`user.age\` is under 18, return \`"Minor"\`. Otherwise, return \`"Authorized"\`.`,
      starterCode: `// Chapter Task Starter Code\nfunction solutionTask(user) {\n  // TODO: Use conditionals to evaluate user status\n  if (!user) return "Invalid User";\n  if (user.isBanned) return "Banned";\n  if (user.age < 18) return "Minor";\n  return "Authorized";\n}`,
      solutionCriteria: `Function must return 'Banned' if isBanned is true, 'Minor' if age < 18, and 'Authorized' otherwise.`
    };
  }

  // 3. Loops (for, while, forEach)
  if (titleLower.includes('loop') || titleLower.includes('for') || titleLower.includes('while') || titleLower.includes('iteration')) {
    return {
      title: topicTitle,
      level: level,
      conceptExplanation: `### 📘 Concept Deep-Dive: Loops & Iteration (${topicTitle})\n\n` +
        `**1. 🎯 Overview & Fundamental Purpose:**\n` +
        `Loops repeat a block of code multiple times until a specified termination condition evaluates to \`false\`. They automate repetitive operations over datasets without repeating code.\n\n` +
        `**2. ⚙️ Step-by-Step Loop Mechanics:**\n` +
        `• **Step 1: Initialization:** The counter or iterator variable is declared (e.g. \`let i = 0\`).\n` +
        `• **Step 2: Condition Check:** Before each iteration, the engine verifies if the expression (\`i < length\`) is \`true\`. If \`false\`, the loop breaks immediately.\n` +
        `• **Step 3: Body Execution & Increment:** The loop body runs, followed by updating the iterator (\`i++\`). Control returns to Step 2.\n\n` +
        `**3. 📐 Loop Types & Best Practices:**\n` +
        `• **Standard \`for\` Loop:** Best when exact iteration count or index control is required.\n` +
        `• **\`for...of\` Loop:** Ideal for iterating over iterable items (Arrays, Strings, Maps) directly.\n` +
        `• **\`while\` Loop:** Used when the number of iterations depends on dynamic conditions (e.g. queue processing).\n\n` +
        `💡 **Pro Tip:** Always verify loop exit conditions to avoid accidental infinite loops that freeze browser threads!`,
      codeSnippet: `// ===============================================\n` +
        `// Practical Example: Loops & Iteration\n` +
        `// ===============================================\n\n` +
        `const userScores = [85, 92, 78, 90, 88];\n` +
        `let totalScore = 0;\n\n` +
        `// 1. Using for...of for clean array iteration\n` +
        `for (const score of userScores) {\n` +
        `  totalScore += score;\n` +
        `}\n` +
        `const average = totalScore / userScores.length;\n` +
        `console.log("Average Score:", average);\n\n` +
        `// 2. Standard for loop with index control\n` +
        `for (let i = 0; i < userScores.length; i++) {\n` +
        `  console.log(\`Student #\${i + 1} Score: \${userScores[i]}\`);\n` +
        `}`,
      projectApplication: `Loops process API response payloads, render lists of posts in UI feeds, and calculate summary stats in dashboards.`,
      quizQuestions: [
        { q: `What causes an infinite loop in JavaScript?`, a: `A loop whose termination condition never becomes false (or lacks an increment step).` },
        { q: `Which loop construct directly iterates over values in an array without manual index counters?`, a: `The 'for...of' loop.` }
      ],
      taskTitle: `Chapter Challenge: Calculate Total Cart Value`,
      taskDescription: `Write a function \`solutionTask(prices)\` that iterates over an array of numbers using a loop and returns the total sum.`,
      starterCode: `// Chapter Task Starter Code\nfunction solutionTask(prices) {\n  let total = 0;\n  // TODO: Add loop to calculate total sum\n  for (const price of prices) {\n    total += price;\n  }\n  return total;\n}`,
      solutionCriteria: `Function must return the correct numerical sum of array elements.`
    };
  }

  // 4. Functions / Arrow Functions
  if (titleLower.includes('function') || titleLower.includes('arrow') || titleLower.includes('parameter')) {
    return {
      title: topicTitle,
      level: level,
      conceptExplanation: `### 📘 Concept Deep-Dive: ${topicTitle}\n\n` +
        `**1. 🎯 Overview & Fundamental Purpose:**\n` +
        `Functions are reusable building blocks of code designed to perform single, well-defined tasks. They accept parameters (inputs), perform computations, and return results.\n\n` +
        `**2. ⚙️ Step-by-Step Invocation Mechanics:**\n` +
        `• **Step 1: Declaration & Scope Binding:** The function signature is defined with parameters. Arrow functions lexically bind \`this\` from their enclosing scope.\n` +
        `• **Step 2: Argument Passing & Stack Frame Creation:** When invoked, arguments are passed into local memory space allocated on the call stack.\n` +
        `• **Step 3: Return Value Resolution:** The function executes its logic and returns an output via \`return\`. Stack frame is popped upon return.\n\n` +
        `**3. 📐 Key Guidelines:**\n` +
        `• **Single Responsibility:** Keep functions small and focused on one clear task.\n` +
        `• **Pure Functions:** Prefer functions that return output based solely on inputs without mutating outside global state.\n\n` +
        `💡 **Pro Tip:** Use ES6 arrow syntax (\`const fn = (a, b) => a + b;\`) for clean short callbacks.`,
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
      projectApplication: `Functions handle event listeners, make HTTP requests, calculate totals, and represent React functional UI components.`,
      quizQuestions: [
        { q: `What keyword is used to output a value from a function?`, a: `The 'return' keyword.` },
        { q: `What is a key feature of ES6 Arrow Functions?`, a: `Shorter syntax and lexical binding of 'this'.` }
      ],
      taskTitle: `Chapter Challenge: Build a Calculation Function`,
      taskDescription: `Implement a function \`solutionTask(num1, num2)\` that multiplies two numbers together and returns the product.`,
      starterCode: `// Chapter Task Starter Code\nfunction solutionTask(num1, num2) {\n  // TODO: Calculate product of num1 and num2 and return it\n  return num1 * num2;\n}`,
      solutionCriteria: `Function must return num1 * num2.`
    };
  }

  // 5. Arrays / List Methods
  if (titleLower.includes('array') || titleLower.includes('map') || titleLower.includes('filter') || titleLower.includes('list')) {
    return {
      title: topicTitle,
      level: level,
      conceptExplanation: `### 📘 Concept Deep-Dive: ${topicTitle}\n\n` +
        `**1. 🎯 Overview & Fundamental Purpose:**\n` +
        `Arrays store collections of values in ordered sequences. Modern JavaScript provides powerful higher-order methods (\`.map()\`, \`.filter()\`, \`.reduce()\`) to process data immutably.\n\n` +
        `**2. ⚙️ Step-by-Step Array Processing:**\n` +
        `• **Step 1: Iteration Setup:** Method iterates over each array element zero-indexed.\n` +
        `• **Step 2: Callback Transformation:** For each item, your callback function runs, returning a transformed item (\`.map()\`) or a boolean test result (\`.filter()\`).\n` +
        `• **Step 3: New Array Creation:** A brand new array containing transformed items is returned without mutating the original source array.\n\n` +
        `**3. 📐 Essential Methods:**\n` +
        `• **\`.map()\`: ** Transforms every element into a new representation.\n` +
        `• **\`.filter()\`: ** Selects elements matching a boolean predicate.\n` +
        `• **\`.reduce()\`: ** Aggregates elements into a single accumulated summary.\n\n` +
        `💡 **Pro Tip:** Always prefer immutable methods (\`.map()\`, \`.filter()\`) over mutating methods (\`.splice()\`) for predictable state handling.`,
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
      projectApplication: `Array methods render lists of components in React, filter data search results in real time, and format backend JSON outputs.`,
      quizQuestions: [
        { q: `Which array method creates a new array with elements that pass a test condition?`, a: `The .filter() method.` },
        { q: `Does .map() mutate the original array?`, a: `No, .map() returns a brand new array.` }
      ],
      taskTitle: `Chapter Challenge: Filter Active Users`,
      taskDescription: `Write a function \`solutionTask(userList)\` that filters an array of user objects and returns only users with \`active: true\`.`,
      starterCode: `// Chapter Task Starter Code\nfunction solutionTask(userList) {\n  // TODO: Use userList.filter() to return active users\n  return userList.filter(user => user.active === true);\n}`,
      solutionCriteria: `Returns an array containing only objects where active === true.`
    };
  }

  // 6. Upgraded Smart Generic Fallback (Detailed 5-Section Markdown Breakdown for any other topic)
  return {
    title: topicTitle,
    level: level,
    conceptExplanation: `### 📘 Concept Deep-Dive: ${topicTitle}\n\n` +
      `**1. 🎯 Overview & Fundamental Purpose:**\n` +
      `Welcome to **${topicTitle}**! This topic forms an essential pillar in software development (${level} Level). It provides key rules and patterns necessary to write clear, reliable, and scalable application logic.\n\n` +
      `**2. ⚙️ Step-by-Step Execution Mechanics:**\n` +
      `• **Step 1: Setup & Context Initialization:** The runtime environment allocates scope, memory references, and parameters required for **${topicTitle}** before execution begins.\n` +
      `• **Step 2: Core Processing & Logic Flow:** Logic statements execute sequentially, evaluating expressions, processing input state, and directing execution branches.\n` +
      `• **Step 3: Output & State Resolution:** The operation completes by returning explicit data outputs, updating component state, or triggering UI updates.\n\n` +
      `**3. 📐 Syntax Patterns & Standard Rules:**\n` +
      `• Structure code cleanly with explicit parameter names and consistent formatting.\n` +
      `• Keep function responsibilities modular and single-purpose.\n` +
      `• Gracefully handle edge cases such as empty data payload, null references, or network timeouts.\n\n` +
      `**4. ⚠️ Common Student Pitfalls:**\n` +
      `• Accidentally mutating global state from inside local execution functions.\n` +
      `• Omitting error validation on external input data.\n` +
      `• Misinterpreting execution order between synchronous and asynchronous code.\n\n` +
      `💡 **Real-World Pro Tip:** Build small, isolated practice examples for **${topicTitle}** to solidify code mental models before combining them into full application features!`,
    codeSnippet: `// ===============================================\n` +
      `// Practical Example: ${topicTitle}\n` +
      `// ===============================================\n\n` +
      `// 1. Core Concept Usage\n` +
      `console.log("=== Demonstration: ${topicTitle} ===");\n` +
      `const payload = { topic: "${topicTitle}", status: "Active" };\n` +
      `console.log("Output Payload:", payload);`,
    projectApplication: `In real-world web development, ${topicTitle} is used for organizing application logic, processing state updates, and maintaining clean code structure.`,
    quizQuestions: [
      { q: `What is the primary goal of mastering ${topicTitle}?`, a: `To write clear, predictable, and maintainable software application code.` },
      { q: `What is the recommended first step when debugging ${topicTitle}?`, a: `Inspect parameter inputs, console logs, and syntax execution flow.` }
    ],
    taskTitle: `Chapter Challenge: ${topicTitle} Task`,
    taskDescription: `Write code demonstrating the core usage of ${topicTitle}.`,
    starterCode: `// TODO: Practice ${topicTitle}\nconst topicName = "${topicTitle}";\nconsole.log("Mastering:", topicName);`,
    solutionCriteria: `Code must execute without syntax errors and produce expected output.`
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

  const prompt = `You are an expert Senior Computer Science Instructor.
Generate a student-friendly, highly structured, and detailed curriculum topic module for software engineering students.

Topic Name: "${topicTitle}"
Module Category: "${moduleId}"
Target Skill Level: "${level}"

IMPORTANT CONTENT REQUIREMENTS:
1. conceptExplanation MUST be a comprehensive markdown deep-dive containing:
   - "### 📘 Concept Deep-Dive: ${topicTitle}" as heading.
   - "1. 🎯 Overview & Fundamental Purpose" (What it is and why we use it).
   - "2. ⚙️ Step-by-Step Execution Mechanics" (Step 1, Step 2, Step 3 breakdown of how it works under the hood).
   - "3. 📐 Syntax & Core Mechanics" (Key rules, structural patterns, code examples).
   - "4. ⚠️ Common Student Pitfalls" (Frequently made mistakes and how to avoid them).
   - "5. 💡 Real-World Pro Tip" (Industry best practice or mental model).
2. codeSnippet MUST be concise (10-15 lines), highly readable code that strictly demonstrates ONLY the syntax and core mechanics of "${topicTitle}". DO NOT include complex enterprise pipeline functions, class structures, microservices, or unnecessary abstraction.
3. taskTitle, taskDescription, and starterCode MUST be tailored specifically to "${topicTitle}". For introductory topics before functions are taught, do NOT wrap starter code in "function solutionTask(data)".

Respond strictly with valid JSON only in the following format without any markdown backticks:
{
  "title": "${topicTitle}",
  "level": "${level}",
  "conceptExplanation": "Detailed step-by-step markdown deep-dive with numbered steps, bullet points, and code rules...",
  "codeSnippet": "// Practical runnable code snippet demonstrating ${topicTitle}\\n...",
  "projectApplication": "Real-world production usage explanation...",
  "quizQuestions": [
    { "q": "Question 1", "a": "Detailed answer" },
    { "q": "Question 2", "a": "Detailed answer" }
  ],
  "taskTitle": "Chapter Challenge: ${topicTitle} Task",
  "taskDescription": "Clear step-by-step assignment instructions specific to ${topicTitle}.",
  "starterCode": "// Topic-specific starter code for student to complete\\n...",
  "solutionCriteria": "Assertion criteria."
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


