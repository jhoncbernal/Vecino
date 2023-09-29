import passport from "passport";
import LocalStrategy from "passport-local";
import GoogleStrategy from "passport-google-oauth20";
import FacebookStrategy from "passport-facebook";
import { User, Worker, Auth } from "../v2/models/index.js";
import { BACKEND_API_URL, OAUTH2 } from "../config/index.js";
// Local authentication
passport.use(
  new LocalStrategy(
    { usernameField: "email" },
    async (email, password, done) => {
      try {
        const auth = await Auth.findOne({
          email,
          providers: { $in: ["local"] },
        });
        if (!auth) {
          return done(null, false, { message: "Incorrect email or password." });
        }
        if (!auth.comparePasswords(password)) {
          return done(null, false, { message: "Incorrect email or password." });
        }
        const user =
          (await User.findOne({ auth: auth._id }).populate({
            path: "auth",
            select: ["email", "enabled", "isVerified"],
          })) ||
          (await Worker.findOne({ auth: auth._id }).populate({
            path: "auth",
            select: ["email", "enabled", "isVerified"],
          }));

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
      clientID: OAUTH2.google.clientID,
      clientSecret: OAUTH2.google.clientSecret,
      callbackURL: `${BACKEND_API_URL}/auth/google/callback`,
      scope: ["email", "profile"],
      profileFields: ["id", "emails", "name", "photos"],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let auth = await Auth.findOne({ providerIds: { $in: [profile.id] } });

        if (!auth) {
          auth = new Auth({
            providerIds: [profile.id],
            providers: ["google"],
            email: profile.emails[0].value, // Assuming Google provides an array of emails and we use the first one.
          });
          await auth.save();
        } else {
          // If "google" is not in the providers array, add it
          if (!auth.providers.includes("google")) {
            auth.providers.push("google");
            auth.providerIds.push(profile.id);
            await auth.save();
          }
        }

        let user =
          (await User.findOne({ auth: auth._id }).populate({
            path: "auth",
            select: ["email", "enabled", "isVerified"],
          })) ||
          (await Worker.findOne({ auth: auth._id }).populate({
            path: "auth",
            select: ["email", "enabled", "isVerified"],
          }));

        if (!user) {
          user = await new User({
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            auth: auth._id,
          }).save();
        }

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
      clientID: `${OAUTH2.facebook.clientID}`,
      clientSecret: `${OAUTH2.facebook.clientSecret}`,
      callbackURL: `${BACKEND_API_URL}/auth/facebook/callback`,
      profileFields: ["id", "email", "name"],
      scope: ["email", "public_profile"],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let auth = await Auth.findOne({ providerIds: { $in: [profile.id] } });

        if (!auth) {
          auth = new Auth({
            providerIds: [profile.id],
            providers: ["facebook"],
            email: profile.emails[0].value, // Asumiendo que Facebook proporciona un array de emails y usamos el primero.
          });
          await auth.save();
        } else {
          if (!auth.providers.includes("facebook")) {
            auth.providers.push("facebook");
            auth.providerIds.push(profile.id);
            await auth.save();
          }
        }
        let user =
          (await User.findOne({ auth: auth._id }).populate({
            path: "auth",
            select: ["email", "enabled", "isVerified"],
          })) ||
          (await Worker.findOne({ auth: auth._id }).populate({
            path: "auth",
            select: ["email", "enabled", "isVerified"],
          }));

        if (!user) {
          user = await new User({
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            auth: auth._id,
          }).save();
        }
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
  let user =
    (await User.findById(id).populate({
      path: "auth",
      select: ["email", "enabled", "isVerified"],
    })) ||
    (await Worker.findById(id).populate({
      path: "auth",
      select: ["email", "enabled", "isVerified"],
    }));
  if (!user.photo) {
    user.photo =
      "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg?20200418092106";
  }
  done(null, user);
});

export default passport;
