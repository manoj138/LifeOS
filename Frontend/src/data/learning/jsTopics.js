// Detailed JavaScript (ES6+) Topic Content Pack (Beginner -> Advanced)

export const jsTopics = {
  "js-0": {
    topicId: "js-0",
    title: "1.1 Variables, Scope & Temporal Dead Zone (TDZ)",
    difficulty: "Beginner",
    estimatedTime: "12 mins",
    summary: "Understand `var`, `let`, and `const`, how scope isolation works, and why accessing variables before initialization triggers a ReferenceError due to the Temporal Dead Zone.",
    analogy: "🏠 Real-World Analogy (मराठीत/In Simple Terms):\nThink of `var` like a public whiteboard in an office corridor (anyone can erase or overwrite it, available everywhere in the building). `let` is like a personal notebook inside your room (only accessible inside that room, and you must open it before reading). `const` is a framed certificate on the wall (you cannot change the frame once put up).",
    howItWorks: `1. Creation Phase (Hoisting):
   - When JavaScript starts executing a block, memory space is allocated for declarations.
   - \`var\` variables are hoisted and initialized immediately with \`undefined\`.
   - \`let\` and \`const\` variables are hoisted into memory, but REMAIN UNINITIALIZED in the Temporal Dead Zone (TDZ).

2. Temporal Dead Zone (TDZ):
   - TDZ is the time window between entering a block scope and reaching the actual declaration line.
   - Accessing a \`let\` or \`const\` variable inside its TDZ throws \`ReferenceError: Cannot access 'x' before initialization\`.

3. Block Scope vs Function Scope:
   - \`var\` is scoped to the enclosing function (ignores \`if\` blocks and loops).
   - \`let\` and \`const\` are scoped strictly to the enclosing curly braces \`{}\`.`,
    badCode: `// ❌ INCORRECT: Dangerous var leakage & TDZ access
console.log(username); // Output: undefined (Silent bug!)
var username = "Manoj";

if (true) {
  var role = "Admin"; // var bleeds out of block scope!
}
console.log(role); // Output: "Admin" (Pollutes global namespace!)

console.log(score); // 💥 ReferenceError: Cannot access 'score' before initialization
let score = 100;`,
    goodCode: `// ✅ RECOMMENDED: Modern ES6 let/const with block scoping
const USER_ROLE = "Admin"; // Immutable binding

let userScore = 100; // Block scoped, declared BEFORE use
userScore += 50;

if (true) {
  const localPermission = "READ_ONLY"; // Kept safely inside this block
  console.log(\`Permission: \${localPermission}\`);
}
// localPermission is garbage collected here!`,
    realWorldUse: "In React components and Node.js controllers, using `const` by default prevents accidental state mutation. Using `let` only for counters or reassignable variables ensures zero variable bleeding across component re-renders.",
    keyTakeaways: [
      "Always default to `const`. Use `let` only when variable reassignment is required.",
      "Never use `var` in modern JavaScript applications to avoid unexpected scope leaks.",
      "TDZ protects you from using variables before they are properly declared."
    ],
    quiz: [
      {
        question: "What happens when you try to access a `let` variable inside its Temporal Dead Zone (before initialization)?",
        options: ["Returns undefined", "Throws ReferenceError", "Returns null", "Creates a global variable"],
        correctIndex: 1,
        explanation: "Because the variable is in the Temporal Dead Zone (TDZ), JavaScript throws a ReferenceError."
      },
      {
        question: "Which keyword is function-scoped rather than block-scoped?",
        options: ["let", "const", "var", "all of the above"],
        correctIndex: 2,
        explanation: "`var` ignores block scope (`if` statements, `for` loops) and is only scoped by function boundaries."
      }
    ],
    practiceCode: `// Try modifying and running this TDZ & Scope test!
function scopeDemo() {
  const name = "Manoj";
  let points = 50;

  if (points > 20) {
    let status = "Passed";
    console.log(\`\${name} status: \${status}\`);
  }

  console.log("Final points:", points);
}

scopeDemo();`
  },

  "js-1": {
    topicId: "js-1",
    title: "1.2 Primitive & Non-Primitive Data Types",
    difficulty: "Beginner",
    estimatedTime: "16 mins",
    summary: "Master all 7 Primitive data types (stored in Stack memory by value) and Non-Primitive / Reference data types (stored in Heap memory by reference).",
    analogy: "🏠 Real-World Analogy (मराठीत/In Simple Terms):\nPrimitive data types are like cash notes in your pocket—if you hand a ₹100 note to your friend, they get a new copy of ₹100, and your cash remains unchanged (Copy by Value). Non-Primitive types are like a shared Google Doc link—if your friend edits the document using their link, the document changes for you too (Copy by Reference)!",
    howItWorks: `1. ALL 7 PRIMITIVE DATA TYPES (Stored in Stack Memory, Immutable):
   - 1. Number: Represents integer & floating-point numbers (e.g. 42, 3.14, Infinity, NaN).
   - 2. String: Textual sequence enclosed in quotes or backticks (e.g. "Manoj", 'LifeOS').
   - 3. Boolean: True or False logical values (true, false).
   - 4. Undefined: Variable declared but not assigned a value yet.
   - 5. Null: Intentional absence of any object value.
   - 6. Symbol: Unique, immutable identifier created via Symbol("id").
   - 7. BigInt: Handles arbitrary-precision integers larger than 2^53 - 1 (e.g. 9007199254740991n).

2. NON-PRIMITIVE / REFERENCE TYPES (Stored in Heap Memory, Mutable):
   - Objects ({ name: "Manoj" }): Key-value collection stored in Heap memory.
   - Arrays ([1, 2, 3]): Special type of object indexed numerically.
   - Functions (function() {}): Callable object instances.
   - Date, RegExp, Map, Set: Built-in object instances.

3. Stack vs Heap Memory Breakdown:
   - Stack: Fast, fixed-size memory for primitives & variable reference pointers.
   - Heap: Dynamic, large memory pool for complex reference objects.

4. typeof Operator Quirks:
   - typeof 42 === "number"
   - typeof "hello" === "string"
   - typeof true === "boolean"
   - typeof undefined === "undefined"
   - typeof null === "object" ⚠️ (JS Legacy Bug since 1995!)
   - typeof Symbol() === "symbol"
   - typeof 10n === "bigint"
   - typeof {} === "object"
   - typeof [] === "object"
   - typeof function(){} === "function"`,
    badCode: `// ❌ INCORRECT: Accidental object mutation bug (Copy by Reference)
const originalUser = { name: "Manoj", role: "Developer" };

// 💥 Copying reference, NOT creating a new independent object!
const copiedUser = originalUser;
copiedUser.role = "Admin"; 

// 💥 Original object was mutated!
console.log(originalUser.role); // Output: "Admin" (Accidental mutation bug!)`,
    goodCode: `// ✅ RECOMMENDED: Proper Immutable Copying (Shallow & Deep Copy)
const originalUser = { name: "Manoj", role: "Developer", settings: { theme: "dark" } };

// ✅ 1. Shallow Copy using Spread Operator ({ ...obj })
const shallowCopy = { ...originalUser, role: "Admin" };

// ✅ 2. Modern Deep Copy using structuredClone() (ES2022)
const deepCopy = structuredClone(originalUser);
deepCopy.settings.theme = "light";

console.log(originalUser.role); // "Developer" (Untouched!)
console.log(originalUser.settings.theme); // "dark" (Untouched!)`,
    realWorldUse: "Crucial for React state updates! Direct state object mutation in React (`state.user.name = 'X'`) fails to trigger component re-renders because React checks object reference equality (`Object.is`). Always use shallow spread copies (`{ ...prev }`) or `structuredClone`.",
    keyTakeaways: [
      "Primitives are passed BY VALUE; Reference types are passed BY REFERENCE.",
      "There are 7 primitive types: Number, String, Boolean, Undefined, Null, Symbol, BigInt.",
      "`typeof null` returns 'object'—this is a famous historical JS bug.",
      "Always use spread `{ ...obj }` or `structuredClone()` to copy objects without mutating original state."
    ],
    quiz: [
      {
        question: "Which of the following is NOT a primitive data type in JavaScript?",
        options: ["Symbol", "BigInt", "Array", "Undefined"],
        correctIndex: 2,
        explanation: "Array is a Non-Primitive / Reference data type (a specialized subtype of Object stored in Heap memory)."
      },
      {
        question: "What does `typeof null` return in JavaScript?",
        options: ["null", "undefined", "object", "boolean"],
        correctIndex: 2,
        explanation: "`typeof null` returns 'object' due to a legacy bug in JS engine memory representation since 1995."
      },
      {
        question: "Where are Primitive data types stored in memory?",
        options: ["Heap Memory", "Stack Memory", "Browser LocalStorage", "Virtual DOM Cache"],
        correctIndex: 1,
        explanation: "Primitive values are stored directly on the Stack memory frame because they have fixed sizes."
      }
    ],
    practiceCode: `// Interactive Data Types & Mutability Playground
const num = 42; // Primitive
let str = "LifeOS"; // Primitive
const userObj = { id: 101, username: "manoj138" }; // Reference Type

// 1. Primitive Copy Test
let numCopy = num;
numCopy = 100;
console.log("Original Primitive num:", num); // 42 (Unchanged!)

// 2. Reference Type Spread Copy Test
const cleanUserCopy = { ...userObj, username: "manoj_updated" };
console.log("Original User Object:", userObj);
console.log("Clean Copied User:", cleanUserCopy);`
  },

  "js-8": {
    topicId: "js-8",
    title: "1.9 Hoisting Mechanism",
    difficulty: "Intermediate",
    estimatedTime: "15 mins",
    summary: "Hoisting is JavaScript's default behavior of moving variable and function declarations to the top of their scope before code execution.",
    analogy: "🏠 Real-World Analogy:\nImagine a theater stage crew putting up all the microphones and props BEFORE the actor walks onto the stage. The setups exist upfront, but the actor's dialogue only starts line-by-line during the live performance.",
    howItWorks: `1. Creation Phase (Memory Allocation):
   - JavaScript engine parses the file before running line 1.
   - Function declarations are placed in memory completely intact.
   - \`var\` variables are registered and set to \`undefined\`.
   - \`let\` / \`const\` variables are registered but marked uninitialized.

2. Execution Phase:
   - Code runs line by line from top to bottom.
   - Assignments happen at the exact line of execution.`,
    badCode: `// ❌ INCORRECT: Calling function expressions before assignment
sayHello(); // 💥 TypeError: sayHello is not a function (var sayHello is undefined!)

var sayHello = function() {
  console.log("Hello World!");
};`,
    goodCode: `// ✅ RECOMMENDED: Function declarations are hoisted completely
sayHello(); // Output: "Hello World!" (Works smoothly!)

function sayHello() {
  console.log("Hello World!");
}`,
    realWorldUse: "Understanding hoisting helps debug weird 'undefined' bugs in backend Node.js APIs and ensures clean function placement at the bottom of utility files for better readability.",
    keyTakeaways: [
      "Function declarations are fully hoisted with their implementation.",
      "Function expressions & arrow functions assigned to variables inherit variable hoisting rules.",
      "Write declarations at the top of their scope for maximum readability."
    ],
    quiz: [
      {
        question: "How are standard function declarations hoisted?",
        options: ["Only variable name is hoisted", "Fully hoisted with body implementation", "Not hoisted at all", "Hoisted as undefined"],
        correctIndex: 1,
        explanation: "Function declarations are completely hoisted with their function bodies intact into memory during the creation phase."
      }
    ],
    practiceCode: `// Test Hoisting in JS
console.log("Var hoisting test:", myVar); // undefined
var myVar = "Loaded";

testHoisting();
function testHoisting() {
  console.log("Function declaration hoisted successfully!");
}`
  },

  "js-9": {
    topicId: "js-9",
    title: "1.10 Closures & Lexical Scope",
    difficulty: "Intermediate",
    estimatedTime: "18 mins",
    summary: "A closure is a function bundled together with references to its surrounding state (lexical environment). Closures allow inner functions to access outer function variables even after the outer function has returned.",
    analogy: "🎒 Real-World Analogy:\nImagine a student leaving school with a backpack containing their favorite books. Even after leaving the school building (outer function finished executing), the student still carries their backpack (closure) everywhere they go!",
    howItWorks: `1. Lexical Scope Definition:
   - Functions in JavaScript remember where they were physically created in the source code.

2. Memory Bundle Creation:
   - When an inner function is defined inside an outer function, JavaScript binds the inner function to the outer function's variable scope.
   - When the outer function returns the inner function, that inner function keeps an active reference to those variables in heap memory.

3. Encapsulation & Data Privacy:
   - Closures allow developers to create private state variables that cannot be modified directly from the outside world.`,
    badCode: `// ❌ INCORRECT: Global variable exposed to accidental modification
let count = 0; // Anybody can overwrite count = 999 anywhere!

function increment() {
  count++;
  return count;
}
increment();`,
    goodCode: `// ✅ RECOMMENDED: Encapsulated private state using Closures
function createCounter() {
  let count = 0; // Private state variable!
  
  return {
    increment: () => ++count,
    decrement: () => --count,
    getCount: () => count
  };
}

const counter = createCounter();
console.log(counter.increment()); // Output: 1
console.log(counter.increment()); // Output: 2
console.log(counter.getCount());  // Output: 2
// count variable cannot be accessed directly from outside!`,
    realWorldUse: "React custom hooks (like `useState` & `useEffect`), memoization caches, factory functions, and Express.js middleware leverage closures to preserve persistent state across asynchronous function calls.",
    keyTakeaways: [
      "Closures give inner functions access to outer function scope even after outer execution ends.",
      "Closures are essential for data privacy and encapsulation.",
      "Be careful: unused closures holding large memory references can cause memory leaks."
    ],
    quiz: [
      {
        question: "What does a closure remember?",
        options: ["Only global variables", "The lexical scope where it was created", "Only function parameters", "Variables declared after it returns"],
        correctIndex: 1,
        explanation: "A closure retains access to variables in its parent lexical scope from where it was created."
      }
    ],
    practiceCode: `function makeMultiplier(multiplier) {
  return function(number) {
    return number * multiplier;
  };
}

const double = makeMultiplier(2);
const triple = makeMultiplier(3);

console.log("Double 5:", double(5)); // 10
console.log("Triple 5:", triple(5)); // 15`
  },

  "js-22": {
    topicId: "js-22",
    title: "1.23 Event Loop (Call Stack, Microtasks & Macrotasks)",
    difficulty: "Advanced",
    estimatedTime: "25 mins",
    summary: "Master JavaScript's single-threaded concurrency model, how the Call Stack, Web APIs, Microtask Queue (Promises), and Macrotask Queue (setTimeout) interact.",
    analogy: "🚦 Real-World Analogy:\nImagine an VIP airport security checkpoint. The Call Stack is the single officer inspecting passports. Regular travelers (setTimeout / macrotasks) wait in a long main line. VIP passport holders (Promises / microtasks) get processed immediately before the officer lets anyone from the regular line pass!",
    howItWorks: `1. Call Stack:
   - Executes synchronous JavaScript code frame by frame (LIFO - Last In First Out).

2. Web APIs / Node C++ APIs:
   - Offloads async timers (\`setTimeout\`), network requests (\`fetch\`), and DOM events off the main thread.

3. Microtask Queue (High Priority):
   - Holds Promise \`.then()\` callbacks, \`async/await\` resume steps, and \`queueMicrotask()\`.
   - Emptied COMPLETELY after every synchronous task before checking macrotasks.

4. Macrotask Queue (Low Priority):
   - Holds \`setTimeout\`, \`setInterval\`, \`setImmediate\`, I/O operations.
   - Event loop picks ONE macrotask at a time, runs it, then drains any newly created microtasks.`,
    badCode: `// ❌ MISUNDERSTANDING: Expecting setTimeout(..., 0) to run synchronously
console.log("Start");
setTimeout(() => console.log("Timeout"), 0); // Thinking this runs next
Promise.resolve().then(() => console.log("Promise"));
console.log("End");

// Actual Console Output:
// Start -> End -> Promise -> Timeout`,
    goodCode: `// ✅ RECOMMENDED: Orchestrating predictable async sequence
async function executionOrder() {
  console.log("1. Sync Code");
  
  setTimeout(() => console.log("4. Macrotask (setTimeout)"), 0);

  await Promise.resolve();
  console.log("2. Microtask (Await Promise)");

  queueMicrotask(() => console.log("3. Microtask Queue"));
}

executionOrder();`,
    realWorldUse: "Critical for preventing UI freezes in React apps, optimizing high-throughput Node.js servers, and diagnosing why `setTimeout(..., 0)` doesn't execute before Promise handlers.",
    keyTakeaways: [
      "JavaScript is single-threaded; async operations are handled by the Event Loop.",
      "Microtasks (Promises) ALWAYS execute before Macrotasks (setTimeout).",
      "Blocking the Call Stack with infinite loops halts the entire event loop execution."
    ],
    quiz: [
      {
        question: "Which queue has higher execution priority in the Event Loop?",
        options: ["Macrotask Queue (setTimeout)", "Microtask Queue (Promise.then)", "DOM Event Queue", "Timer Queue"],
        correctIndex: 1,
        explanation: "Microtask Queue is processed completely before the Event Loop moves to the Macrotask Queue."
      }
    ],
    practiceCode: `console.log("A: Sync");

setTimeout(() => console.log("B: Macrotask Timeout"), 0);

Promise.resolve()
  .then(() => console.log("C: Microtask Promise 1"))
  .then(() => console.log("D: Microtask Promise 2"));

console.log("E: Sync End");`
  }
};
