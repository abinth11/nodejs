const cluster = require("node:cluster");
const OS = require("node:os");
const http = require("http");
const numCores = OS.cpus().length;

if (cluster.isPrimary) {
  for (let i = 0; i < numCores; i++) {
    cluster.fork();
  }
} else {
  const server = http.createServer((req, res) => {
    if (req.url === "/") {
      console.log(`received on process ${process.pid}`);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ status: true, message: "Hello there", pid: process.pid }));
    } else if (req.url === "/slow") {
      for (let i = 0; i < 10000000000; i++) {
        // Simulating a heavy computation
      }
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ status: true, message: "slow response" }));
    } else {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("Not Found");
    }
  });

  const PORT = 3000;
  server.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`);
  });
}
