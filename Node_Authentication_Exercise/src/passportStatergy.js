const passport = require("passport");
const localstrategy = require("passport-local").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const { userModel } = require("./models/model");
const bcrypt = require("bcrypt");
const secrets=require('./appSecrets');
function check(password, has) {
  return new Promise(function (resolve, reject) {
    bcrypt.compare(password, has, function (err, result) {
      // result == true
      //    console.log(err);
      //    console.log(result);
      //    return result;
      resolve(result);
    });
  });
}

passport.use(
  new localstrategy(
    { usernameField: "Email", passwordField: "Password" },
    (username, password, done) => {
      // console.log(username);
      // console.log(password);

      userModel
        .findOne({ email: username })
        .then(async (user) => {
          // console.log(user);
          // console.log(password);
          if (!user) return done(new Error("invalid user"));
          let ans = await check(password, user.password);
          // console.log("res=>"+ans);
          if (!ans) {
            return done(null, false);
          }
          return done(null, user);
        })
        .catch(done);
    }
  )
);

passport.use(new FacebookStrategy({
    clientID: secrets.FACEBOOK_APP_ID,
    clientSecret: secrets.FACEBOOK_APP_SECRET,
    callbackURL: "http://localhost:8000/auth/facebook/callback"
  },
  async function(accessToken, refreshToken, profile, done) {
      console.log(profile);
    const user= await userModel.findOneAndUpdate({username:profile.id},{
        username:profile.id,
        email:profile.displayName,
        password:profile.id
    },{upsert:true});

     done(null,user);
  }
));

passport.serializeUser((user, done) => {
  console.log("user===>" + user);
  done(null, user._id);
  // done(null,user)
});

passport.deserializeUser((userid, done) => {
  console.log("userid===>", userid);
  UserModel.findOne({
    _id: userid,
  })
    .then((user) => {
      console.log("usersssss=>>>", user);
      done(null, user);
    })
    .catch(done);
  // done(null,userid);
});

module.exports = { passport };
