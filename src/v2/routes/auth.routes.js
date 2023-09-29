import { Router } from "express";
import passport from "passport";
import "../../utils/passport-setup.js";
import { AccessControl } from "../../middlewares/index.js";

export default function ({ AuthController }) {
  const router = Router();

  const providers = ["google", "facebook"];

  const handleOAuthError = (err, req, res, next) => {
    console.error(err); // Log the error to the server's console
    res.redirect("http://localhost:5173/login?error=Authentication failed."); // Redirect to the frontend with a query parameter indicating the error
  };

  router.post(
    `/login/local`,
    [
      passport.authenticate("local"),
      (req, res) => {
        req.session.save((err) => {
          if (err) {
            return next(err);
          }
          res.send(req.user);
        });
      },
    ],
    handleOAuthError
  );

  router.post(`/register/local`, AuthController.create, handleOAuthError);

  providers.forEach((provider) => {
    router.get(
      `/${provider}/callback`,
      passport.authenticate(provider, { failureRedirect: "/login" }),
      (req, res) => {
        res.redirect("http://localhost:5173/");
      },
      handleOAuthError
    );

    router.get(
      `/register/${provider}`,
      provider === "local"
        ? AuthController.create
        : [
            passport.authenticate(provider),
            (req, res) => {
              res.send(req.user);
            },
          ],
      handleOAuthError
    );
  });

  // Other routes
  router.post("/verifyOtp", AuthController.verifyOtp);
  router.post("/resendOtp", AuthController.resendOtp);
  router.get("/check", AccessControl("Auth"), AuthController.checkAuth);
  router.post("/logout", (req, res) => {
    req.logout(() => {
      // Once the logout operation completes, handle the session destruction
      if (req.session) {
        req.session.destroy((err) => {
          if (err) {
            console.error("Error destroying session:", err);
            return res.status(500).json({ message: "Failed to log out." });
          }

          // Clear the cookie on client side
          res.clearCookie("connect.sid", { path: "/" }); // Adjust the cookie name if it's different
          return res.json({ message: "Successfully logged out." });
        });
      } else {
        // If not using sessions, just send a successful response
        res.json({ message: "Successfully logged out." });
      }
    });
  });

  router.get("/status", (req, res) => {
    if (req.isAuthenticated()) {
      res.json({ isAuthenticated: true, user: req.user });
    } else {
      res.json({ isAuthenticated: false });
    }
  });

  // Uncomment if these routes are needed in the future
  // ... (as in your initial code)

  return router;
}
