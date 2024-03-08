/**
 * Import HTTP Standar Library dari Node.js
 * Hal inilah yang nantinya akan kita gunakan untuk membuat
 * HTTP Server
 * */
const http = require("http");
const { PORT = 7000 } = process.env; // Ambil port dari environment variable

const fs = require("fs");
const path = require("path");
// const mime = require("mime");

const cars = require("../data/cars.min.json");

// Request handler
// Fungsi yang berjalan ketika ada request yang masuk.
function onRequest(req, res) {
  if (req.url === "/") {
    fs.readFile("./public/index.html", "UTF-8", function (err, html) {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(html);
    });
  } else if (req.url === "/cars") {
    fs.readFile("./public/cars/index.html", "UTF-8", function (err, html) {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(html);
    });
  } else if (req.url === "/getcars") {
    const dataPath = path.join(__dirname, "../data", "/cars.json");
    const fileStream = fs.createReadStream(dataPath, "UTF-8");
    res.writeHead(200, { "Content-Type": "application/json" });
    fileStream.pipe(res);
  } else if (req.url.match(".css$")) {
    //  console.log('masuk sini====css===');
    const cssPath = path.join(__dirname, "../public", req.url);
    const fileStream = fs.createReadStream(cssPath, "UTF-8");
    res.writeHead(200, { "Content-Type": "text/css" });
    fileStream.pipe(res);
  } else if (req.url.match(".png$")) {
    const imagePath = path.join(__dirname, "../public", req.url);
    const fileStream = fs.createReadStream(imagePath);
    res.writeHead(200, { "Content-Type": "image/png" });
    fileStream.pipe(res);
  } else if (req.url.match(".jpg$")) {
    const imagePath = path.join(__dirname, "../public", req.url);
    const fileStream = fs.createReadStream(imagePath);
    res.writeHead(200, { "Content-Type": "image/jpg" });
    fileStream.pipe(res);
  } else if (req.url.match(".js$")) {
    //  console.log('masuk sini===js====');
    const jsPath = path.join(__dirname, "../public", req.url);
    const fileStream = fs.createReadStream(jsPath);
    res.writeHead(200, { "Content-Type": "application/javascript" });
    fileStream.pipe(res);
  } else if (req.url === "/api/cars") {
    res.setHeader("Content-Type", "application/json");
    res.writeHead(200);
    res.end(JSON.stringify(cars));
    return;
  }
}

const server = http.createServer(onRequest);

// Jalankan server
server.listen(PORT, "0.0.0.0", () => {
  console.log("Server sudah berjalan, silahkan buka http://localhost:%d", PORT);
});
