// Detailed DevOps, Deployment & DSA Topic Content Pack

export const devopsTopics = {
  "dev-1": {
    topicId: "dev-1",
    title: "10.2 Hostinger VPS & UFW Firewall Setup",
    difficulty: "Advanced",
    estimatedTime: "20 mins",
    summary: "Set up and secure an Ubuntu Linux Virtual Private Server (VPS) on Hostinger using SSH key pairs and Uncomplicated Firewall (UFW).",
    analogy: "🏠 Real-World Analogy:\nThink of a raw VPS like a newly rented office building. Setting up UFW firewall is like hiring security guards who block all uninvited doors and only allow people with authorized badges through Door 22 (SSH), Door 80 (HTTP), and Door 443 (HTTPS)!",
    howItWorks: `1. Initial SSH Access:
   - Connect via root user: \`ssh root@YOUR_SERVER_IP\`.

2. Hardening Security:
   - Disable password login in \`/etc/ssh/sshd_config\` (\`PasswordAuthentication no\`) to force SSH key authentication only.

3. Configuring UFW Firewall:
   - Deny all incoming traffic by default, allow outgoing.
   - Explicitly open SSH (Port 22), HTTP (Port 80), and HTTPS (Port 443).
   - Enable firewall: \`ufw enable\`.`,
    badCode: `# ❌ INCORRECT: Exposed root login with password authentication
# Server vulnerable to brute-force SSH attacks on open ports!
ssh root@192.168.1.1 # Using simple password "admin123"

# 💥 Leaving internal database ports exposed publicly to the internet:
ufw allow 27017 # Exposed MongoDB port to public attackers!`,
    goodCode: `# ✅ RECOMMENDED: Hardened VPS Setup Commands

# 1. Update Linux system packages
sudo apt update && sudo apt upgrade -y

# 2. Configure UFW Firewall rules safely
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow 22/tcp    # SSH
sudo ufw allow 80/tcp    # HTTP
sudo ufw allow 443/tcp   # HTTPS
sudo ufw enable

# 3. Verify Firewall Status
sudo ufw status verbose`,
    realWorldUse: "Standard production server setup routine for deploying Node.js web applications, APIs, databases, and microservices on VPS cloud providers (Hostinger, AWS EC2, DigitalOcean, Hetzner).",
    keyTakeaways: [
      "Always configure firewall rules (UFW) BEFORE deploying production applications.",
      "Never expose internal database ports (27017 for Mongo, 5432 for Postgres) to the public internet.",
      "Disable root password login and rely strictly on SSH RSA/Ed25519 key pairs."
    ],
    quiz: [
      {
        question: "Which port should be opened for encrypted HTTPS web traffic?",
        options: ["Port 80", "Port 22", "Port 443", "Port 8080"],
        correctIndex: 2,
        explanation: "Port 443 is the standard network port for secure, SSL/TLS encrypted HTTPS traffic."
      }
    ],
    practiceCode: `// Emulating SSH Command Verification
const commands = [
  "sudo ufw default deny incoming",
  "sudo ufw allow 22/tcp",
  "sudo ufw allow 443/tcp",
  "sudo ufw enable"
];

console.log("🚀 Server Security Setup Script:\n" + commands.join("\n"));`
  },

  "dev-5": {
    topicId: "dev-5",
    title: "10.6 Nginx Reverse Proxy Configuration & SSL",
    difficulty: "Advanced",
    estimatedTime: "25 mins",
    summary: "Configure Nginx as a high-performance reverse proxy server in front of your Node.js application to handle SSL termination, static file serving, and load balancing.",
    analogy: "🏠 Real-World Analogy:\nThink of Nginx like a receptionist at a luxury hotel front desk. When guests arrive (web traffic), the receptionist checks their reservation (SSL HTTPS), handles routine questions (serving static images/CSS directly), and forwards complex room service requests directly to the back kitchen (Node.js backend app)!",
    howItWorks: `1. Request Interception:
   - Client sends HTTPS requests to port 443. Nginx intercepts the request, decrypts SSL/TLS certificates (Let's Encrypt), and proxies HTTP traffic internally to Node.js listening on \`http://127.0.0.1:5000\`.

2. Reverse Proxy Directives:
   - Pass real client IP headers (\`X-Real-IP\`, \`X-Forwarded-For\`) so Node.js can identify client origins accurately.`,
    badCode: `// ❌ INCORRECT: Exposing Node.js Directly to Internet Port 80
// 💥 Node.js single thread forced to handle SSL handshake, static files & API routes!
app.listen(80, () => {
  console.log("Direct web exposure - dangerous & unoptimized!");
});`,
    goodCode: `# ✅ RECOMMENDED: Nginx Reverse Proxy Config (/etc/nginx/sites-available/default)

server {
    listen 80;
    server_name mydomain.com www.mydomain.com;
    return 301 https://$host$request_uri; # Redirect HTTP to HTTPS
}

server {
    listen 443 ssl http2;
    server_name mydomain.com;

    ssl_certificate /etc/letsencrypt/live/mydomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/mydomain.com/privkey.pem;

    location / {
        proxy_pass http://127.0.0.1:5000; # Internal Node.js app
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_cache_bypass $http_upgrade;
    }
}`,
    realWorldUse: "Standard web architecture deployed by 80%+ of top enterprise software companies worldwide to secure Node.js, Python, and Go microservices.",
    keyTakeaways: [
      "Never expose Node.js directly to port 80/443; always place Nginx in front as a Reverse Proxy.",
      "Nginx handles SSL termination much faster than Node.js single-threaded event loop.",
      "Always forward proxy headers (`X-Real-IP`) so backend rate limiters work properly."
    ],
    quiz: [
      {
        question: "Why should Nginx act as a Reverse Proxy in front of Node.js?",
        options: [
          "It replaces the database",
          "It efficiently handles SSL termination, static file caching, and protects Node from direct web exposure",
          "It automatically fixes JavaScript syntax errors",
          "It runs React components on the server"
        ],
        correctIndex: 1,
        explanation: "Nginx offloads SSL decryption, static caching, and security buffering from Node's single-threaded event loop."
      }
    ],
    practiceCode: `// Simulating Nginx Header Forwarding
const reqHeaders = {
  'host': 'api.lifeos.com',
  'x-real-ip': '103.45.12.9',
  'x-forwarded-proto': 'https'
};

console.log("Nginx Proxied Headers Received by Node backend:", reqHeaders);`
  },

  "car-0": {
    topicId: "car-0",
    title: "9.1 DSA: Arrays & Two-Pointer Pattern",
    difficulty: "Intermediate",
    estimatedTime: "18 mins",
    summary: "Master the Two-Pointer algorithmic pattern to solve array and string search problems efficiently in O(N) time complexity instead of O(N²) nested loops.",
    analogy: "🏠 Real-World Analogy:\nImagine searching for two books on a shelf whose page counts add up to 500. Instead of taking book 1 and checking it against all other books (O(N²)), you put one finger on the far left (smallest) and one on the far right (largest) and slide them inward based on the current sum!",
    howItWorks: `1. Pointer Initialization:
   - Place Left Pointer \`L = 0\` and Right Pointer \`R = array.length - 1\`.

2. Iterative Condition:
   - Compare \`arr[L] + arr[R]\` against target value.
   - If sum < target, move \`L++\` to increase value.
   - If sum > target, move \`R--\` to decrease value.
   - If sum === target, solution found in O(N) time!`,
    badCode: `// ❌ INCORRECT: O(N²) Slow Brute-Force Nested Loop
function twoSumBruteForce(arr, target) {
  // 💥 Takes 10,000,000 iterations for array of size 10,000!
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] + arr[j] === target) return [i, j];
    }
  }
  return [];
}`,
    goodCode: `// ✅ RECOMMENDED: O(N) Two-Pointer Pattern on Sorted Array
function twoSumTwoPointer(arr, target) {
  let left = 0;
  let right = arr.length - 1;

  while (left < right) {
    const currentSum = arr[left] + arr[right];
    if (currentSum === target) {
      return [left, right]; // Found in O(N) time!
    } else if (currentSum < target) {
      left++;
    } else {
      right--;
    }
  }
  return [];
}

console.log(twoSumTwoPointer([1, 3, 5, 8, 11, 15], 14)); // Output: [2, 3]`,
    realWorldUse: "Crucial algorithmic pattern used for high-performance sorting, array searches, and technical interview problem solving.",
    keyTakeaways: [
      "Two-Pointer pattern converts O(N²) nested loops into clean O(N) single passes.",
      "Requires the array to be sorted when performing range or sum searches.",
      "Crucial pattern for technical coding interviews at top tech companies."
    ],
    quiz: [
      {
        question: "What is the time complexity of the Two-Pointer pattern on a sorted array?",
        options: ["O(N²)", "O(N log N)", "O(N)", "O(1)"],
        correctIndex: 2,
        explanation: "Two-Pointer traverses the array from both ends inward in a single pass, yielding O(N) linear time complexity."
      }
    ],
    practiceCode: `// Test Two-Pointer Pair Target Finder
function testTwoPointer() {
  const sortedArray = [2, 7, 11, 15];
  const target = 9;
  let l = 0, r = sortedArray.length - 1;

  while (l < r) {
    let sum = sortedArray[l] + sortedArray[r];
    if (sum === target) {
      console.log(\`✅ Found target \${target} at indices [\${l}, \${r}]\`);
      return;
    }
    sum < target ? l++ : r--;
  }
}

testTwoPointer();`
  }
};
