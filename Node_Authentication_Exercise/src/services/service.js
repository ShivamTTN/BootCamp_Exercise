const { userModel } = require("../models/model");
const bcrypt = require("bcrypt");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const salt_round = 10;

module.exports.signup = async ({ Username, Email, Password }) => {
  const result = await userModel.findOne({ email: Email });
  var data = null;
  let hashPass = null;
  if (result) {
    data = "Email Already Exist !!!";
  } else {
    bcrypt.hash(Password, salt_round, (err, hash) => {
      if (err) {
        console.log(err);
      } else {
        // console.log(hash)
        // hashPass = hash;
        data = userModel.create({
          username: Username,
          email: Email,
          password: hash,
        });
      }
    });
  }
  return { created: 1 };
};

module.exports.login = async ({ Email, Password }) => {
  passport.use(
    new LocalStrategy(function (username, password, done) {
      userModel.findOne({ email: Email }, function (err, user) {
        if (user !== null) {
          var isPasswordCorrect = bcrypt.compare(Password, user.password);
          if (isPasswordCorrect) {
            console.log("Username and password correct!");
            return done(null, user);
          } else {
            console.log("Password incorrect!");
            return done(null, false);
          }
        } else {
          console.log("Username does not exist!");
          return done(null, false);
        }
      });
    })
  );
};
