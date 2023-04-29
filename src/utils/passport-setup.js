const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const { User, Worker, Auth } = require("../v2/models/index"); // Assuming your models are exported from a single file

// Local authentication
passport.use(
  new LocalStrategy(
    { usernameField: "email" },
    async (email, password, done) => {
      try {
        const auth = await Auth.findOne({ email, provider: "local" });
        if (!auth) {
          return done(null, false, { message: "Incorrect email or password." });
        }
        auth.comparePasswords(password);
        const user =
          (await User.findOne({ auth: auth._id })) ||
          (await Worker.findOne({ auth: auth._id }));

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

// Google OAuth2 authentication
passport.use(
  new GoogleStrategy(
    {
      clientID: "GOOGLE_CLIENT_ID",
      clientSecret: "GOOGLE_CLIENT_SECRET",
      callbackURL: "http://localhost:3000/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Find or create the Auth document for the Google user
        // ...

        // Find or create the User or Worker document associated with the Auth document
        // ...

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

// Facebook authentication
passport.use(
  new FacebookStrategy(
    {
      clientID: "FACEBOOK_APP_ID",
      clientSecret: "FACEBOOK_APP_SECRET",
      callbackURL: "http://localhost:3000/auth/facebook/callback",
      profileFields: ["id", "email", "name"],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Find or create the Auth document for the Facebook user
        // ...

        // Find or create the User or Worker document associated with the Auth document
        // ...

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

// Serialize and deserialize user
passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  const user = (await User.findById(id)) || (await Worker.findById(id));
  done(null, user);
});

module.exports = passport;
