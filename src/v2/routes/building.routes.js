import { Router } from "express";

export default function ({ BuildingController }) {
  const router = Router();

  router.get("/:id", BuildingController.get);
  router.get("", BuildingController.getAll);
  //router.get("/user/:userId", BuildingController.getUserBuildings);
  router.post("/register", BuildingController.create);
  router.patch("/:id", BuildingController.update);
  router.delete("/:id", BuildingController.delete);

  return router;
}