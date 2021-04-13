var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
const { json } = require("express");

const usersData = [
  { id: 1, firstname: "shivam", lastname: "saxena", email: "shivam@ttn.com" },
  { id: 2, firstname: "fenil", lastname: "amliwala", email: "fenil@ttn.com" },
  { id: 3, firstname: "aman", lastname: "bhanwadia", email: "aman@ttn.com" },
  { id: 4, firstname: "abc", lastname: "xyz", email: "abc@ttn.com" },
  { id: 5, firstname: "pqr", lastname: "stu", email: "pqr@ttn.com" },
];
var app = express();
const PORT = 8080;
app.listen(PORT, () => {
  console.info("Server is running @:http://localhost:%d", PORT);
});
// view engine setup
app.use(cors());
app.get("/", (req, res) => {
  res.send(JSON.stringify(usersData));
});
app.post("/add-user", (req, res) => {
  console.log(req.data)
});

module.exports = app;
