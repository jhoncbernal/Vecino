import { Router } from "express";

export default function ({VehicleController}) {
  const router = Router();

  router.get("/:id", VehicleController.get);
  router.get("", VehicleController.getAll);
  //router.get("/user/:userId", VehicleController.getUserVehicles);
  router.post("/register", VehicleController.create);
  router.patch("/:id", VehicleController.update);
  router.delete("/:id", VehicleController.delete);

  return router;
} 