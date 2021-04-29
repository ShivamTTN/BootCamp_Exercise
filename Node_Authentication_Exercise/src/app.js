const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { passport } = require("./passportStatergy");
// const session=require('express-session')
// var ejs = require("ejs")
// const bodyParser = require("body-parser");
const routes = require("./routes/usersRoute");
const port = 8000;

app.use(
  express.urlencoded({
    extended: "true",
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(__dirname + "/public"));
app.use(routes);

mongoose.connect("mongodb://127.0.0.1:27017/nodeAuth", {
  useNewUrlParser: "true",
  useUnifiedTopology: "true",
});
app.set("view engine", "ejs");

mongoose.connection.on("error", (err) => {
  console.log("Error in connection with mongo :", err);
});
mongoose.connection.on("connected", (err, res) => {
  console.log("Connected to Mongo");
});

app.listen(port, () => {
  console.log("Server Started on PORT :", port);
});
