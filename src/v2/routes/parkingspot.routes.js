import { Router } from "express";
import { AccessControl } from "../../middlewares/index.js";

export default function ({ ParkingSpotController }) {
  const router = Router();

  router.get("/:id", ParkingSpotController.get);
  router.get(
    "",
    AccessControl("ParkingSpot", "read"),
    ParkingSpotController.getAll
  );
  //router.get("/user/:userId", ParkingSpotController.getUserParkingSpots);
  router.post("/register", ParkingSpotController.create);
  router.patch("/:id", ParkingSpotController.update);
  router.delete("/:id", ParkingSpotController.delete);

  return router;
}