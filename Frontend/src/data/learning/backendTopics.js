// Detailed Backend Topic Content Pack (Node, Express, MongoDB, Auth, REST APIs)

export const backendTopics = {
  "node-6": {
    topicId: "node-6",
    title: "3.7 Streams (Readable, Writable & Pipelines)",
    difficulty: "Advanced",
    estimatedTime: "22 mins",
    summary: "Streams are data-handling channels that allow reading or writing data piece by piece without loading the entire file into RAM.",
    analogy: "🏠 Real-World Analogy:\nImagine watching a movie on YouTube. Instead of downloading the full 10GB video file into your device's memory before playing line 1, YouTube streams small 2MB chunks so you start watching instantly!",
    howItWorks: `1. Memory Optimization:
   - Reading a 4GB log file with \`fs.readFile()\` crashes the Node process with \`FATAL ERROR: CALL_AND_RETRY_LAST Allocation failed - JavaScript heap out of memory\`.
   - Streaming reads data in small \`Buffers\` (default 64KB chunk size).

2. Stream Types:
   - \`Readable\`: Source of data (e.g., \`fs.createReadStream()\`, HTTP request).
   - \`Writable\`: Destination for data (e.g., \`fs.createWriteStream()\`, HTTP response).
   - \`Transform\`: Modifies data as it passes through (e.g., \`zlib.createGzip()\`).

3. Backpressure Management:
   - Streams manage backpressure automatically when the writable destination cannot write as fast as the readable source emits data.`,
    badCode: `// ❌ INCORRECT: Loading huge files entirely into RAM
const fs = require('fs');
const http = require('http');

http.createServer((req, res) => {
  // 💥 Crashes server when file size > RAM limit!
  fs.readFile('./huge_video.mp4', (err, data) => {
    res.end(data);
  });
}).listen(3000);`,
    goodCode: `// ✅ RECOMMENDED: Production Stream Pipeline with Backpressure
const fs = require('fs');
const http = require('http');
const { pipeline } = require('stream');

http.createServer((req, res) => {
  const readStream = fs.createReadStream('./huge_video.mp4');

  // ✅ Stream chunks directly to HTTP response with clean error handling
  pipeline(readStream, res, (err) => {
    if (err) {
      console.error('Stream Pipeline failed:', err);
      res.statusCode = 500;
      res.end('Server Stream Error');
    }
  });
}).listen(3000);`,
    realWorldUse: "Used in enterprise video streaming platforms (Netflix), CSV file exports containing millions of user records, real-time logging systems, and cloud uploads to AWS S3 / Cloudinary.",
    keyTakeaways: [
      "Streams process data sequentially in chunks without overflowing Node's heap memory.",
      "Always use `stream.pipeline()` instead of `.pipe()` to handle memory cleanup and stream errors properly.",
      "Default chunk size is 64KB for standard streams, customizable via `highWaterMark`."
    ],
    quiz: [
      {
        question: "Why does `fs.readFile()` fail on extremely large files?",
        options: [
          "Node.js does not support video files",
          "It attempts to buffer the entire file into RAM at once, crashing the heap limit",
          "Node.js enforces a 10-second file reading timeout",
          "It locks the CPU operating system thread forever"
        ],
        correctIndex: 1,
        explanation: "`fs.readFile()` loads the full file into memory at once, whereas Streams process data chunk-by-chunk."
      }
    ],
    practiceCode: `// Simulating Readable Stream Chunks
const { Readable } = require('stream');

const sampleStream = Readable.from(['Chunk 1 (64KB)', 'Chunk 2 (64KB)', 'Chunk 3 (64KB)']);

sampleStream.on('data', (chunk) => {
  console.log("📦 Received Stream Chunk:", chunk);
});

sampleStream.on('end', () => {
  console.log("✅ Stream Finished Processing!");
});`
  },

  "express-1": {
    topicId: "express-1",
    title: "4.2 Middleware Pipeline & Order of Execution",
    difficulty: "Intermediate",
    estimatedTime: "18 mins",
    summary: "Middleware functions are functions that have access to the request (`req`), response (`res`), and `next` function in the application's request-response cycle.",
    analogy: "🏠 Real-World Analogy:\nThink of Express middleware like security checks at a night club entrance. Bouncer 1 checks your ticket (`authMiddleware`), Bouncer 2 checks your ID (`roleMiddleware`), Bouncer 3 stamps your hand (`rateLimitMiddleware`), and finally you enter the main hall (Route Controller)!",
    howItWorks: `1. Execution Chain:
   - Express runs middleware in the EXACT order they are registered via \`app.use()\`.

2. The \`next()\` Function:
   - If a middleware does not call \`next()\`, the request hangs forever unless \`res.send()\` is invoked.

3. Error-Handling Middleware Signature:
   - Error middleware MUST accept 4 arguments: \`(err, req, res, next)\`. Express identifies error handlers solely by 4-parameter arity!`,
    badCode: `// ❌ INCORRECT: Missing next() call & wrong placement of error middleware
app.use((req, res, next) => {
  console.log("Logger");
  // 💥 Forgotten next()! Request hangs forever!
});

// 💥 Error middleware placed BEFORE routes (never receives errors!)
app.use((err, req, res, next) => {
  res.status(500).send("Error!");
});

app.get("/users", (req, res) => res.json([]));`,
    goodCode: `// ✅ RECOMMENDED: Strict Middleware Pipeline Architecture
const express = require('express');
const app = express();

// 1. Built-in body parsing
app.use(express.json());

// 2. Logging & Audit Middleware
app.use((req, res, next) => {
  console.log(\`[\${new Date().toISOString()}] \${req.method} \${req.url}\`);
  next(); // Always call next()!
});

// 3. Controller Routes
app.get('/api/v1/profile', (req, res) => {
  res.json({ status: "success", user: "Manoj" });
});

// 4. Global Error Handling Middleware (ALWAYS LAST with 4 params!)
app.use((err, req, res, next) => {
  console.error("Global Error Caught:", err.message);
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error"
  });
});`,
    realWorldUse: "Forming the backbone of Node.js API servers for JWT auth verification, CORS headers, rate limiting, request validation with Zod, payload compression, and centralized error handling.",
    keyTakeaways: [
      "Middleware order matters! Registered top-to-bottom.",
      "Always call `next()` or return a response to avoid hanging requests.",
      "Global error handling middleware MUST take 4 arguments `(err, req, res, next)`."
    ],
    quiz: [
      {
        question: "How does Express distinguish a global error-handling middleware from normal middleware?",
        options: [
          "By checking if it returns a 500 status",
          "By its function signature having 4 parameters (err, req, res, next)",
          "By passing 'error' to app.use('error', ...)",
          "By wrapping it in a try-catch block"
        ],
        correctIndex: 1,
        explanation: "Express checks function arity. A middleware with 4 parameters `(err, req, res, next)` is treated as an error handler."
      }
    ],
    practiceCode: `// Middleware execution order simulator
const stack = [];

function middleware1(req, next) {
  stack.push("Middleware 1 Start");
  next();
  stack.push("Middleware 1 End");
}

function middleware2(req, next) {
  stack.push("Middleware 2 Executed");
  next();
}

function run() {
  middleware1({}, () => middleware2({}, () => {
    stack.push("Controller Handled!");
  }));
  console.log("Pipeline Order:", stack);
}

run();`
  },

  "mongo-5": {
    topicId: "mongo-5",
    title: "5.6 Database Indexing (B-Tree & Query Performance)",
    difficulty: "Advanced",
    estimatedTime: "25 mins",
    summary: "Indexes support the efficient execution of queries in MongoDB. Without indexes, MongoDB must perform a collection scan (COLLSCAN) to examine every single document in a collection.",
    analogy: "🏠 Real-World Analogy:\nImagine searching for a specific topic in a 1,000-page printed encyclopedia. Without an index (COLLSCAN), you must read page 1, page 2... up to page 1,000. With an alphabetical Index (IXSCAN) at the back of the book, you flip directly to page 742 in 2 seconds!",
    howItWorks: `1. B-Tree Data Structure:
   - MongoDB creates a balanced tree (B-Tree) structure on indexed fields, storing sorted keys and pointers to actual document disk locations.

2. COLLSCAN vs IXSCAN:
   - COLLSCAN (Collection Scan): O(N) linear search; slow, high CPU usage, reads millions of documents.
   - IXSCAN (Index Scan): O(log N) binary search; super fast, minimal RAM/CPU load.

3. Compound Indexes & Equality-Sort-Range (ESR) Rule:
   - When indexing multiple fields, order your compound index using ESR: **Equality fields first**, **Sort fields second**, **Range fields last**.`,
    badCode: `// ❌ INCORRECT: Querying millions of records without an Index (COLLSCAN)
// MongoDB Schema without indexes:
const userSchema = new mongoose.Schema({
  email: String, // Unindexed!
  createdAt: Date
});

// 💥 Query scans all 5,000,000 documents! Execution time: 3,400ms
const user = await User.findOne({ email: "user@example.com" });`,
    goodCode: `// ✅ RECOMMENDED: Compound Indexing following ESR Rule
const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, index: true }, // Single Field Index
  status: String,
  role: String,
  createdAt: Date
});

// ✅ Compound Index (Equality: status/role, Range: createdAt)
userSchema.index({ status: 1, role: 1, createdAt: -1 });

// Query now performs IXSCAN! Execution time: 2ms
const activeAdmins = await User.find({ status: "ACTIVE", role: "ADMIN" })
  .sort({ createdAt: -1 });`,
    realWorldUse: "Essential for all production MongoDB databases storing over 10,000 records to prevent CPU spikes, database slowdowns, and server crashes during peak web traffic.",
    keyTakeaways: [
      "Indexes transform O(N) collection scans into O(log N) fast B-Tree lookups.",
      "Use `explain('executionStats')` in Mongo shell/Mongoose to verify query execution paths.",
      "Don't over-index! Every index adds overhead to `insert`, `update`, and `delete` write operations."
    ],
    quiz: [
      {
        question: "What does COLLSCAN mean in MongoDB query explain plans?",
        options: [
          "Fast B-Tree Index lookup",
          "Slow Collection Scan examining every single document in the collection",
          "Collection Cache Memory hit",
          "Compressed Document Storage"
        ],
        correctIndex: 1,
        explanation: "COLLSCAN means MongoDB had to scan every document sequentially because no matching index was available."
      }
    ],
    practiceCode: `// Simulating Index O(log N) Lookup speed vs O(N) Scan
const totalDocs = 1000000;
console.log(\`COLLSCAN checks: \${totalDocs} operations\`);
console.log(\`IXSCAN B-Tree checks: \${Math.ceil(Math.log2(totalDocs))} operations!\`);`
  },

  "auth-0": {
    topicId: "auth-0",
    title: "6.1 JSON Web Tokens (JWT) Architecture & Best Practices",
    difficulty: "Intermediate",
    estimatedTime: "20 mins",
    summary: "JSON Web Token (JWT) is a compact, URL-safe means of representing claims to be transferred between two parties. Used for stateless authentication.",
    analogy: "🏠 Real-World Analogy:\nThink of a JWT like a stamped wristband at a music festival. The security guard at the gate verifies the official hologram stamp (Digital Signature) without having to call the central ticket office (database) every single time you re-enter a stage!",
    howItWorks: `1. JWT Structure (Three Base64-URL Encoded Parts):
   - **Header**: Contains algorithm (\`HS256\`, \`RS256\`) & token type (\`JWT\`).
   - **Payload**: Contains claims (User ID, Role, Issued At \`iat\`, Expiration \`exp\`).
   - **Signature**: Generated by hashing \`Header + Payload\` with a secret server key.

2. Stateless Verification:
   - The backend verifies signature integrity using the secret key without querying MongoDB on every HTTP request!`,
    badCode: `// ❌ INCORRECT: Storing sensitive data in JWT & storing tokens in localStorage
// 💥 NEVER put passwords or secrets in JWT Payload! Payload is easily decoded via base64!
const dangerousToken = jwt.sign({ userId: 123, passwordHash: "secret123" }, "weak_secret");

// 💥 Frontend storing access token in localStorage (vulnerable to XSS attacks!):
localStorage.setItem('accessToken', dangerousToken);`,
    goodCode: `// ✅ RECOMMENDED: Secure Short-Lived JWT + HttpOnly Refresh Cookie
const jwt = require('jsonwebtoken');

// 1. Generate short-lived access token (15 mins) with minimal safe payload
function generateAccessToken(user) {
  return jwt.sign(
    { userId: user._id, role: user.role },
    process.env.JWT_ACCESS_SECRET,
    { expiresIn: '15m' }
  );
}

// 2. Send Refresh Token in secure HttpOnly Cookie (Prevents XSS attacks!)
res.cookie('refreshToken', refreshToken, {
  httpOnly: true, // Cannot be read by client-side JS scripts!
  secure: true,   // HTTPS only
  sameSite: 'strict',
  maxAge: 7 * 24 * 60 * 60 * 1000 // 7 Days
});`,
    realWorldUse: "Standard authentication protocol across MERN applications, microservices, mobile apps (iOS/Android), and third-party API integrations.",
    keyTakeaways: [
      "JWT Payloads are NOT encrypted—they are only Base64 encoded! Anyone can read them.",
      "Signatures guarantee token authenticity; never trust unverified tokens.",
      "Store access tokens in memory / state and refresh tokens in HttpOnly, SameSite cookies."
    ],
    quiz: [
      {
        question: "Is data stored inside a JWT payload encrypted?",
        options: [
          "Yes, completely hidden from public view",
          "No, it is only Base64-URL encoded and readable by anyone",
          "Yes, encrypted with AES-256",
          "Only when using HTTPS"
        ],
        correctIndex: 1,
        explanation: "JWT payloads are Base64 encoded, NOT encrypted. Anyone can decode them; the signature only prevents tampering."
      }
    ],
    practiceCode: `// Encoding & Decoding JWT Payload emulation
const payload = { userId: "usr_99812", role: "Admin", exp: 1750000000 };
const base64Payload = btoa(JSON.stringify(payload));

console.log("Base64 Encoded Payload:", base64Payload);
console.log("Decoded Payload:", JSON.parse(atob(base64Payload)));`
  }
};
