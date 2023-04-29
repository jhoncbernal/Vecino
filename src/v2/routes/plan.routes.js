const { Router } = require("express");
const { EnsureAuthenticated } = require("../../middlewares");

module.exports = function ({ PlanController }) {
  const router = Router();

  router.get("/:id", PlanController.get);
  router.get("", PlanController.getAll);
  router.post("/register", PlanController.create);
  router.patch("/:id", PlanController.update);
  router.delete("/:id", PlanController.delete);

  return router;
};
