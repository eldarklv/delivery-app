const passport = require("passport");
const User = require("../models/UserModel");
const LocalStrategy = require("passport-local").Strategy;
const UserModule = require("../modules/UserModule");

passport.use(
  new LocalStrategy(
    { usernameField: "email" },
    async (email, password, done) => {
      try {
        const user = await UserModule.findByEmail(email);

        if (!user) {
          console.log("test")
          return done(null, false, { message: "Incorrect email." });
        }

        const isValidPassword = await UserModule.isValidPassword(password, email);

        if (!isValidPassword) {
          return done(null, false, { message: "Incorrect password." });
        }

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});
