// Detailed React.js Topic Content Pack (Beginner -> Advanced)

export const reactTopics = {
  "react-0": {
    topicId: "react-0",
    title: "2.1 JSX Syntax & Expressions",
    difficulty: "Beginner",
    estimatedTime: "10 mins",
    summary: "JSX is a syntax extension for JavaScript that allows you to write HTML-like markup inside JavaScript code files.",
    analogy: "🏠 Real-World Analogy:\nThink of JSX like a blue-print template. Instead of building walls (HTML) and painting electrical lines (JS) in two separate buildings, JSX lets you draw the blueprint and paste live dynamic controls directly inside!",
    howItWorks: `1. Transpilation via Babel / SWC:
   - Browsers DO NOT understand JSX directly.
   - Babel transforms \`<h1 className="title">Hello</h1>\` into \`React.createElement('h1', { className: 'title' }, 'Hello')\`.

2. JavaScript Expressions inside \`{}\`:
   - Anything inside curly braces \`{ expression }\` is evaluated as standard JavaScript (variables, ternary checks, function calls).`,
    badCode: `// ❌ INCORRECT: Using class instead of className & unclosed tags
function BadComponent() {
  return (
    <div class="card">
      <img src="avatar.png">
      <p>User Name: Manoj</p>
    </div>
  )
}`,
    goodCode: `// ✅ RECOMMENDED: Valid JSX with clean expressions
function GoodComponent({ user }) {
  return (
    <div className="card p-4 rounded-xl bg-slate-900 text-white">
      <img src={user.avatarUrl} alt={user.name} className="w-12 h-12 rounded-full" />
      <h3 className="font-bold text-lg">{user.name}</h3>
      <p className="text-sm text-gray-400">
        Status: {user.isOnline ? "🟢 Online" : "🔴 Offline"}
      </p>
    </div>
  );
}`,
    realWorldUse: "Used across every single React component to render dynamic UI structures bound cleanly to component state and props.",
    keyTakeaways: [
      "JSX requires self-closing tags for void elements like `<img />` and `<input />`.",
      "Use `className` instead of `class` and `htmlFor` instead of `for`.",
      "JSX elements must return a single root element or React Fragment `<>...</>`."
    ],
    quiz: [
      {
        question: "What does Babel transpile JSX elements into?",
        options: ["Direct DOM node references", "React.createElement() function calls", "Raw HTML strings", "JSON payload objects"],
        correctIndex: 1,
        explanation: "JSX is syntactic sugar for `React.createElement(type, props, ...children)` calls."
      }
    ],
    practiceCode: `function UserBadge() {
  const name = "Manoj Patil";
  const role = "Lead Engineer";

  return (
    <div className="p-3 bg-purple-900/40 text-purple-200 rounded-lg">
      <h4>{name}</h4>
      <span className="text-xs">{role.toUpperCase()}</span>
    </div>
  );
}

UserBadge();`
  },

  "react-3": {
    topicId: "react-3",
    title: "2.4 State Management (useState)",
    difficulty: "Beginner",
    estimatedTime: "15 mins",
    summary: "State is a component's memory. The `useState` hook provides stateful value tracking and triggers component re-renders whenever state changes.",
    analogy: "🏠 Real-World Analogy:\nThink of `useState` like a digital scoreboard at a cricket match. When a run is scored, the scoreboard operator presses a button (`setState`), and the display updates automatically for all spectators!",
    howItWorks: `1. Component Memory Allocation:
   - \`const [state, setState] = useState(initialValue)\` preserves variable value across re-renders.

2. Triggering Re-Renders:
   - Calling \`setState(newValue)\` schedules a re-render. React compares new state with old state using \`Object.is()\`. If different, React re-executes the component function.

3. Functional State Updates:
   - When updating state based on previous state, always pass a callback: \`setCount(prev => prev + 1)\`.`,
    badCode: `// ❌ INCORRECT: Direct mutation & state batching bug
function BadCounter() {
  let [count, setCount] = useState(0);

  const handleClick = () => {
    // 💥 Direct mutation fails to trigger re-render!
    count = count + 1; 

    // 💥 Stale closure issue when calling twice:
    setCount(count + 1);
    setCount(count + 1); // Still increments by 1, not 2!
  };
}`,
    goodCode: `// ✅ RECOMMENDED: Immutable functional state updates
function GoodCounter() {
  const [count, setCount] = useState(0);

  const handleIncrementTwice = () => {
    setCount(prev => prev + 1);
    setCount(prev => prev + 1); // Correctly increments by 2!
  };

  return (
    <button onClick={handleIncrementTwice} className="px-4 py-2 bg-blue-600 rounded-lg text-white font-bold">
      Count: {count}
    </button>
  );
}`,
    realWorldUse: "Used in forms, modal toggles, API loading flags, shopping carts, and interactive dashboards throughout modern React web apps.",
    keyTakeaways: [
      "Never mutate state variables directly (`state = 5`). Always use setter function.",
      "Use functional updates (`setVal(prev => ...)` when new state depends on previous state.",
      "State updates in React are batched asynchronously for performance optimization."
    ],
    quiz: [
      {
        question: "Why should you use functional updates `setCount(prev => prev + 1)`?",
        options: [
          "It is required by TypeScript",
          "It guarantees you operate on the most up-to-date pending state",
          "It stops component re-rendering",
          "It bypasses Virtual DOM checks"
        ],
        correctIndex: 1,
        explanation: "Functional updates access the latest queued state, avoiding bugs caused by stale closures."
      }
    ],
    practiceCode: `// Try incrementing state using functional updates!
function CounterDemo() {
  let stateValue = 0;
  const update = (fn) => {
    stateValue = fn(stateValue);
    console.log("Updated State:", stateValue);
  };

  update(prev => prev + 1);
  update(prev => prev + 5);
}

CounterDemo();`
  },

  "react-11": {
    topicId: "react-11",
    title: "2.12 Context API & Global State",
    difficulty: "Intermediate",
    estimatedTime: "20 mins",
    summary: "Context API provides a way to pass data through the component tree without having to manually pass props down through every level (Prop Drilling).",
    analogy: "🏠 Real-World Analogy:\nProp drilling is like handing a letter from person A -> B -> C -> D -> E just to deliver it to person E. Context API is like setting up a Wi-Fi router in the building—anyone authorized inside the building can connect directly to the Wi-Fi signal!",
    howItWorks: `1. Context Creation:
   - \`const AuthContext = createContext(null)\` defines the shape of shared data.

2. Context Provider:
   - \`<AuthContext.Provider value={{ user, login, logout }}>\` wraps sub-trees to broadcast state updates.

3. Context Consumption:
   - \`const { user } = useContext(AuthContext)\` consumes values in any child component cleanly.`,
    badCode: `// ❌ INCORRECT: Painful Prop Drilling through 4 component layers
function App() {
  const [theme, setTheme] = useState("dark");
  return <Header theme={theme} setTheme={setTheme} />;
}
function Header({ theme, setTheme }) {
  return <Nav theme={theme} setTheme={setTheme} />;
}
function Nav({ theme, setTheme }) {
  return <ThemeButton theme={theme} setTheme={setTheme} />; // 😭 3 layers passed down!
}`,
    goodCode: `// ✅ RECOMMENDED: Clean Context API Architecture
import React, { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("dark");
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme: () => setTheme(t => t === 'dark' ? 'light' : 'dark') }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);

// Deep nested component consumes context directly!
function ThemeButton() {
  const { theme, toggleTheme } = useTheme();
  return <button onClick={toggleTheme}>Current Theme: {theme}</button>;
}`,
    realWorldUse: "Used for app-wide settings like active user authentication, UI color themes (Dark/Light mode), language localization (i18n), and global notification toasts.",
    keyTakeaways: [
      "Use Context for truly global state (Auth, Theme, Multi-language).",
      "Avoid using Context for high-frequency state updates (like mouse positions or rapid form inputs) as it causes all consuming children to re-render.",
      "Combine Context with `useReducer` for complex global state management."
    ],
    quiz: [
      {
        question: "What main problem does the Context API solve?",
        options: ["Memory leaks in useEffect", "Prop Drilling through multiple nested components", "Slow CSS styling render times", "Replacing backend API calls"],
        correctIndex: 1,
        explanation: "Context API eliminates prop drilling by allowing deep components to consume global context directly."
      }
    ],
    practiceCode: `// Emulating Context State Broadcast
const ContextState = {
  theme: "dark",
  user: "Manoj Admin"
};

function readContext() {
  console.log("Consumed Context Data:", ContextState);
}

readContext();`
  },

  "react-17": {
    topicId: "react-17",
    title: "2.18 Performance (React.memo, useMemo & useCallback)",
    difficulty: "Advanced",
    estimatedTime: "25 mins",
    summary: "Master React performance techniques to prevent redundant re-renders, expensive recalculations, and object reference re-instantiations.",
    analogy: "🏠 Real-World Analogy:\nImagine a chef recalculating a complex recipe cost every single time a waiter walks past the kitchen. `useMemo` is like writing the cost on a sticky note and only recalculating when ingredient prices actually change!",
    howItWorks: `1. React.memo (Component Memoization):
   - Wraps a functional component to skip rendering if its incoming props haven't changed.

2. useMemo (Value Memoization):
   - Caches the calculated result of an expensive function between renders: \`const total = useMemo(() => computeHeavyTotal(items), [items])\`.

3. useCallback (Function Reference Memoization):
   - Caches a function definition between renders to maintain referential equality when passed as props to memoized children.`,
    badCode: `// ❌ INCORRECT: Heavy recalculation & broken referential equality
function BadReport({ items }) {
  // 💥 Runs heavy array sorting on EVERY component render!
  const sortedItems = items.sort((a, b) => b.price - a.price);

  // 💥 New inline function object created every render (breaks React.memo child!)
  const handleDelete = (id) => console.log("Delete item", id);

  return <ItemList data={sortedItems} onDelete={handleDelete} />;
}`,
    goodCode: `// ✅ RECOMMENDED: Optimized React Performance Stack
import React, { useMemo, useCallback } from 'react';

function GoodReport({ items, onDeleteItem }) {
  // ✅ Memoized expensive computation: only recalculates when items change
  const sortedItems = useMemo(() => {
    return [...items].sort((a, b) => b.price - a.price);
  }, [items]);

  // ✅ Memoized callback function reference
  const handleDelete = useCallback((id) => {
    onDeleteItem(id);
  }, [onDeleteItem]);

  return <MemoizedItemList data={sortedItems} onDelete={handleDelete} />;
}

// ✅ Skipped when props don't change!
const MemoizedItemList = React.memo(({ data, onDelete }) => {
  return <div>{data.length} items rendered efficiently!</div>;
});`,
    realWorldUse: "Critical in large enterprise dashboards, data tables with thousands of rows, interactive charts, and complex forms to ensure smooth 60fps UI performance.",
    keyTakeaways: [
      "Don't over-optimize prematurely! Use memoization when profiling proves re-render bottlenecks.",
      "Premature `useMemo`/`useCallback` can actually add slight overhead due to dependency array checks.",
      "Always pass dependency arrays accurately to prevent stale closure bugs."
    ],
    quiz: [
      {
        question: "When should you use `useCallback`?",
        options: [
          "To fetch data from backend API",
          "To cache function references passed to memoized child components",
          "To replace useState setters",
          "To hide CSS animations"
        ],
        correctIndex: 1,
        explanation: "`useCallback` preserves function reference equality so `React.memo` child components don't re-render needlessly."
      }
    ],
    practiceCode: `// Memoization Cache Emulation
const cache = new Map();

function memoizedCompute(x) {
  if (cache.has(x)) {
    console.log("⚡ Returning from Cache:", cache.get(x));
    return cache.get(x);
  }
  console.log("🐢 Expensive Computation running...");
  const result = x * 1000;
  cache.set(x, result);
  return result;
}

memoizedCompute(5); // Calculates
memoizedCompute(5); // Hits cache instant!`
  }
};
