// include HTTP library from node
const http = require("http");

// include MainController from local file
const MainController = require("./app/controllers/MainController.js");
const MainCtrl = new MainController();

// #1
const server = http.createServer(function (req, res) {
  // need to call controller
  MainCtrl.main(req, res);
});
// #2
// const server = http.createServer(MainCtrl.main);

const port = 3000;
server.listen(port, function () {
  console.log(`Server running at http://localhost:${port}`);
});
