import { defineAbilitiesFor } from "../utils/ability.js";

export default(req, res, next) =>{
  const { user } = req;

  if (!user) {
    return res.status(401).send("Unauthorized");
  }

  const ability = defineAbilitiesFor(user);
  const { action, subject } = req.params; // action = read, update, delete, etc.

  if (!ability.can(action, subject)) {
    return res.status(403).send("Forbidden");
  }

  next();
}
