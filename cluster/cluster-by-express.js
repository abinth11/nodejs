const cluster = require("node:cluster");
const OS = require("node:os");
const express = require("express");
const numCores = OS.cpus().length;

if (cluster.isPrimary) {
  for (let i = 0; i < numCores; i++) {
    cluster.fork();
  } 
} else {
  const app = express();
  const PORT = 3000;
  app.get("/", (req, res) => {
    console.log(`received on process ${process.pid}`);
    res.json({ status: true, message: "Hello there", pid: process.pid });
  });
  app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`);
  });
}
