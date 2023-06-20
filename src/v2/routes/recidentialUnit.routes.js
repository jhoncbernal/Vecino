import { Router } from "express";
import { AccessControl } from "../../middlewares/index.js";

export default function ({ RecidentialUnitController }) {
  const router = Router();

  router.get(
    "/:id",
    AccessControl("RecidentialUnit"),
    RecidentialUnitController.get
  );
  router.get(
    "",
    AccessControl("RecidentialUnit"),
    RecidentialUnitController.getAll
  );
  router.get(
    "/user/:id",
    AccessControl("RecidentialUnit"),
    RecidentialUnitController.getUsersRecidentialUnit
  );
  router.get(
    "/unit/:unitNumber",
    AccessControl("RecidentialUnit"),
    RecidentialUnitController.getByUnitNumber
  );
  router.post("/register", RecidentialUnitController.create);
  router.patch("/:id", RecidentialUnitController.update);
  router.delete("/:id", RecidentialUnitController.delete);


  return router;
}