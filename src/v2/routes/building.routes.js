const { Router } = require("express");

module.exports = function ({ BuildingController }) {
  const router = Router();

  router.get("/:id", BuildingController.get);
  router.get("", BuildingController.getAll);
  //router.get("/user/:userId", BuildingController.getUserBuildings);
  router.post("", BuildingController.create);
  router.patch("/:id", BuildingController.update);
  router.delete("/:id", BuildingController.delete);

  return router;
}