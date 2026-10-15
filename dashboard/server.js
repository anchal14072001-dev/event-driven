const http = require("http");
const fs = require("fs");
const path = require("path");

let port = parseInt(process.env.PORT, 10) || 3000;
const HTML_FILE = path.join(__dirname, "index.html");

function startServer(currentPort) {
  const server = http.createServer((req, res) => {
    fs.readFile(HTML_FILE, "utf-8", (err, content) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Internal Server Error: " + err.message);
        return;
      }
      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      res.end(content);
    });
  });

  server.on("error", (err) => {
    if (err.code === "EADDRINUSE") {
      console.log(`⚠️  Port ${currentPort} is busy. Trying port ${currentPort + 1}...`);
      startServer(currentPort + 1);
    } else {
      console.error("Server Error:", err.message);
    }
  });

  server.listen(currentPort, () => {
    console.log(`\n=======================================================`);
    console.log(`🚀 Microservices Output & Saga Visualizer is LIVE!`);
    console.log(`👉 Open in your browser: http://localhost:${currentPort}`);
    console.log(`=======================================================\n`);
  });
}

startServer(port);
