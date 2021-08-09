// will add all env variable from ".env" file to node process.env
require("dotenv").config();

// do all other stuff
const express = require("express");
const path = require("path");

const {
  studentsRouter,
  usersRouter,
} = require("./app/routes/api");

const server = express();

// set templating engine
server.set("view engine", "ejs");
// change default location of templating engine views
server.set("views", path.resolve(__dirname, "app/views"));
// export "assets" folder as public folder
server.use(express.static(path.resolve(__dirname, "assets")));
// used to parse req.body for POST,PUT requests
server.use(express.urlencoded({ extended: false }));
server.use(express.json());

// routing
server.get("/", function (req, res) {
  res.render("pages/index", { content: "This is home" });
});
server.use("/students", studentsRouter);
server.use("/users", usersRouter);
// fallback to error page
server.use(function (req, res) {
  const error = {
    status: 404,
  };
  res.render("pages/error", { error });
});

server.use((error, _, res, __) => {
  console.log(error);
  error.status ? res.status(error.status).render("pages/error", { error }) : res.status(500).render("pages/fail");
})

// start server
const port = 3000;
server.listen(port, function () {
  console.log(`Server running at http://localhost:${port}`);
});
