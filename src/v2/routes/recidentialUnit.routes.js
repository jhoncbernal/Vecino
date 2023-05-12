import { Router } from "express";
import { AccessControl } from "../../middlewares/index.js";

export default function ({ RecidentialUnitController }) {
  const router = Router();

  router.get("/:id", RecidentialUnitController.get);
  router.get(
    "",
    AccessControl("RecidentialUnit", "read"),
    RecidentialUnitController.getAll
  );
  //router.get("/user/:userId", RecidentialUnitController.getUserRecidentialUnits);
  router.post("/register", RecidentialUnitController.create);
  router.patch("/:id", RecidentialUnitController.update);
  router.delete("/:id", RecidentialUnitController.delete);

  return router;
}