import { defineAbilitiesFor } from "../utils/ability.js";

const AccessControl = (subject, action) => (req, res, next) => {
  const methodMap = {
    get: "read",
    post: "create",
    put: "update",
    patch: "update",
    delete: "delete",
  };
  action = action || methodMap[req.method.toLowerCase()];
  const isAuthenticated = req.isAuthenticated();
  if (
    (!isAuthenticated && req.method !== "GET") ||
    (!isAuthenticated && subject === "Auth")
  ) {
    // If the user is authenticated, continue with the next middleware or handler
    return res.status(401).send({ message: "Authentication required" });
  }

  const { user } = req;

  const ability = defineAbilitiesFor(user);
  if (!ability.can(action, subject)) {
    return res.status(403).send({ message: "Forbidden" });
  }
  req.ability = ability;
  req.ability.subject = subject;
  req.ability.action = action;
  next();
};

export default AccessControl;
