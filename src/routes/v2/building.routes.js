const { Router } = require("express");

module.exports = function ({ BuildingController }) {
  const router = Router();

  router.get("/:buildingId", BuildingController.get);
  router.get("", BuildingController.getAll);
  //router.get("/user/:userId", BuildingController.getUserBuildings);
  router.post("", BuildingController.create);
  router.patch("/:buildingId", BuildingController.update);
  router.delete("/:buildingId", BuildingController.delete);

  return router;
}