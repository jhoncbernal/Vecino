import { Router } from "express";

export default function ({ RecidentialUnitController }) {
  const router = Router();

  router.get("/:id", RecidentialUnitController.get);
  router.get("", RecidentialUnitController.getAll);
  //router.get("/user/:userId", RecidentialUnitController.getUserRecidentialUnits);
  router.post("/register", RecidentialUnitController.create);
  router.patch("/:id", RecidentialUnitController.update);
  router.delete("/:id", RecidentialUnitController.delete);

  return router;
}