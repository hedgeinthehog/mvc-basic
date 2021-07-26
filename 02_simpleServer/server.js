// include HTTP library from node
const http = require("http");
// include file system library from node
const fs = require("fs");

const server = http.createServer(function (req, res) {
  // #1 hardcoded string
  // req.url == "/", "/students", "/students/1"
  // req.method = "GET", "POST"
  // req.body - only post POST, PUT
  // res.writeHead(200, { 'Content-Type': 'text/plain' });
  // res.write("Hello there!");
  // res.write("<html>........"); // <-- WRONG

  // #2 send html file content
  // fs.readFile("./index2.html", function (error, data) {
  //     if (error) {
  //         res.writeHead(404, {
  //             'Content-Type': 'text/plain',
  //         });
  //         res.end("can't read the file");
  //     } else {
  //         // happy path
  //         res.writeHead(200, {
  //             'Content-Type': 'text/html',
  //             'Content-Length': data.length,
  //         });
  //         // res.write(data);
  //         res.end(data);
  //     }
  // });

  // #3 send html to response as a stream
  fs.access("./index.html", function (error) {
    if (error) {
      res.writeHead(404, {
        "Content-Type": "text/plain",
      });
      res.end("no file found");
    } else {
      // happy path
      const fileStream = fs.createReadStream("./index.html");
      fileStream.pipe(res);
    }
  });
});

// 3000 - 5999
const port = 3000;
server.listen(port, function () {
  console.log(`Server running at http://localhost:${port}`);
});
