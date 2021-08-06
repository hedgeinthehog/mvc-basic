// will add all env variable from ".env" file to node process.env
require("dotenv").config();

// do all other stuff
const express = require("express");
const path = require("path");

const studentsRouter = require("./app/routes/api");

const server = express();

// set templating engine
server.set("view engine", "ejs");
// change default location of templating engine views
server.set("views", path.resolve(__dirname, "app/views"));
// export "assets" folder as public folder
server.use(express.static(path.resolve(__dirname, "assets")));
// used to parse req.body for POST,PUT requests
server.use(express.urlencoded({ extended: false }));

// routing
server.get("/", function (req, res) {
  res.render("pages/index", { content: "This is home" });
});
// students
server.use("/students", studentsRouter);
// fallback to error page
server.use("*", function (req, res) {
  res.render("pages/error");
});

// start server
const port = 3000;
server.listen(port, function () {
  console.log(`Server running at http://localhost:${port}`);
});
