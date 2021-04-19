const express = require("express");
const mongoose = require("mongoose");
// const bodyParser = require("body-parser");
const app = express();
const port = 8000;
const routes = require("./Items/routes");

app.use(express.urlencoded({
  extended:true
}));
app.use(routes);

mongoose.connect("mongodb://127.0.0.1:27017/dbInventoryManagement", {
  useNewUrlParser: "true",
  useUnifiedTopology: true,
});

mongoose.connection.on("error", (err) => {
  console.log("err", err);
});

mongoose.connection.on("connected", (err, res) => {
  console.log("Connected To Mongoose");
});

app.listen(port, () =>
  console.log(`Mongoose App For Inventry At Port : ${port}`)
);
