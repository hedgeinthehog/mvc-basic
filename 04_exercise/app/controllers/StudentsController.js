// import file system library from node
const fs = require("fs");
// import path helper library from node
const path = require("path");

class StudentsController {
  views = "../views/";

  error(res) {
    const filePath = path.resolve(__dirname, this.views, 'error.html');
    fs.access(filePath, function (error) {
      if (error) {
        res.writeHead(404, {
          "Content-Type": "text/plain",
        });
        res.end("404");
      } else {
        res.writeHead(404, {
          "Content-Type": "text/html",
        });
        const fileStream = fs.createReadStream(filePath);
        fileStream.pipe(res);
      }
    });
  }

  returnView(res, filePath, contentType) {
    const resolvedPath = path.resolve(__dirname, filePath);
    fs.access(resolvedPath, (error) => {
      if (error) {
        this.error(res);
      } else {
        res.writeHead(200, {
          "Content-Type": contentType,
        });
        const fileStream = fs.createReadStream(resolvedPath, "UTF-8");
        fileStream.pipe(res);
      }
    });
  }

  main(req, res) {
    const url = req.url;
    const [all, id] = url.match(/\/students\/?(\d+)?$/);
    if (id) {
      this.returnView(res, `${this.views}student${id}.html`, "text/html");
    } else {
      this.returnView(res, `${this.views}students.html`, "text/html");
    }
  }
}

module.exports = StudentsController;
