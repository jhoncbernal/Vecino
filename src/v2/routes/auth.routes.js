import { Router } from "express";
import passport from "passport"; "../../utils/passport-setup.js";
export default function ({ AuthController }) {
  const router = Router();
   router.post("/login", passport.authenticate("local"), (req, res) => {
    // If authentication is successful, redirect to the homepage
    res.redirect("/welcome");
  }); 
  //router.post("/signin", AuthController.create);
  router.post("/register", AuthController.create);
  router.post("/verifyOtp", AuthController.verifyOtp);
  router.post("/resendOtp", AuthController.resendOtp);
  //router.post("/signin", AuthController.signIn);
  //router.post("/recover", AuthController.recover);
  //router.get("/reset/:token", AuthController.reset);
  //router.post("/reset/:token", AuthController.resetPassword);
  //router.post("/verify", AuthController.verifyEmail);
  //router.get("/verify/:token", AuthController.verify);
  //router.post("/signinUpdate", AuthController.signInAndUpdate);
  return router;
};
