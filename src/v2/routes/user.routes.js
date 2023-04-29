const { Router } = require("express");
const {
  EnsureAuthenticated
} = require("../../middlewares");

module.exports = function ({ UserController }) {
  const router = Router();

  router.get("/:id",EnsureAuthenticated, UserController.get);
  router.get("",EnsureAuthenticated, UserController.getAll);
  router.post("/register", UserController.create);
  router.patch("/:id", UserController.update);
  router.delete("/:id", UserController.delete);

  return router;
}