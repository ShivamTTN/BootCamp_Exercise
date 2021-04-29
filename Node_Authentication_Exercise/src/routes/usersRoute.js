var express = require("express");
const passport = require("passport");
// const bcrypt = require("bcrypt");
var router = express.Router();
const userController = require("../controllers/controller");
const LocalStrategy = require("passport-local").Strategy;

/* GET users listing. */

router.get("/failed", (req, res) => {
  console.log("Failed In Login");
  res.send("Failed In Login");
});

router.get("/success", (req, res) => {
  console.log("Success In Login");
  res.send("Success In Login");
});

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.post("/signup", userController.signup);

router.get("/auth/facebook", passport.authenticate("facebook"));
router.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: "/success",
    failureRedirect: "/failed",
  })
);

router.get("/", (req, res) => {
  res.render("login");
});

router.post(
  "/",
  passport.authenticate("local", {
    failureRedirect: "/failed",
    successRedirect: "/success",
  })
);

module.exports = router;
