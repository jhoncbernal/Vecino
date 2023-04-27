const { Router } = require("express");

module.exports = function ({ ParkingSpotController }) {
  const router = Router();

  router.get("/:parkingSpotId", ParkingSpotController.get);
  router.get("", ParkingSpotController.getAll);
  //router.get("/user/:userId", ParkingSpotController.getUserParkingSpots);
  router.post("", ParkingSpotController.create);
  router.patch("/:parkingSpotId", ParkingSpotController.update);
  router.delete("/:parkingSpotId", ParkingSpotController.delete);

  return router;
}