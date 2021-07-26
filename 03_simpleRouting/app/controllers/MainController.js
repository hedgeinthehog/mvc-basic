// import file system library from node
const fs = require("fs");
// import path helper library from node
const path = require("path");

class MainController {
  // constructor() {}
  views = "../views/";

  main(req, res) {
    const url = req.url;
    let templatePath = `index.html`;
    
    if (url === "/students") {
      templatePath = `students.html`;
    } else if (url.endsWith(".css")) {
      // localhost:3000/main.css
      const cssPath = path.resolve(__dirname, `../..${url}`);
      fs.access(cssPath, function (error) {
        if (error) {
          res.end();
        } else {
          res.writeHead(200, {
            "Content-Type": "text/css",
          });
          const fileStream = fs.createReadStream(cssPath, "UTF-8");
          fileStream.pipe(res);
        }
      });
      return;
    }

    const resolvedPath = path.resolve(__dirname, this.views, templatePath);

    fs.access(resolvedPath, function (error) {
      if (error) {
        res.writeHead(404, {
          "Content-Type": "text/plain",
        });
        res.end("no file found");
      } else {
        // happy path
        const fileStream = fs.createReadStream(resolvedPath);
        fileStream.pipe(res);
      }
    });
  }
}

module.exports = MainController;
