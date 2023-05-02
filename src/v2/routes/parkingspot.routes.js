import { Router } from "express";

export default function ({ ParkingSpotController }) {
  const router = Router();

  router.get("/:id", ParkingSpotController.get);
  router.get("", ParkingSpotController.getAll);
  //router.get("/user/:userId", ParkingSpotController.getUserParkingSpots);
  router.post("/register", ParkingSpotController.create);
  router.patch("/:id", ParkingSpotController.update);
  router.delete("/:id", ParkingSpotController.delete);

  return router;
}