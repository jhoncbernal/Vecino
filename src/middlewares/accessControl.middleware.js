import { defineAbilitiesFor } from "../utils/ability.js";

const AccessControl = (subject, action) => (req, res, next) => {
  if (!req.isAuthenticated() && req.method !== "GET") {
    // If the user is authenticated, continue with the next middleware or handler
    res.status(401).json({ error: "Authentication required" });
  }

  const { user } = req;

  const ability = defineAbilitiesFor(user);
  if (!ability.can(action, subject)) {
    return res.status(403).send("Forbidden");
  }
  req.ability = ability;
  req.ability.subject = subject;
  req.ability.action = action;
  next();
};

export default AccessControl;
