const { Router } = require("express");

module.exports = function ({VehicleController}) {
  const router = Router();

  router.get("/:vehicleId", VehicleController.get);
  router.get("", VehicleController.getAll);
  //router.get("/user/:userId", VehicleController.getUserVehicles);
  router.post("", VehicleController.create);
  router.patch("/:vehicleId", VehicleController.update);
  router.delete("/:vehicleId", VehicleController.delete);

  return router;
} 