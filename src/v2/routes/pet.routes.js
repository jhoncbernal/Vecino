import { Router } from "express";
import { AccessControl } from "../../middlewares/index.js";

export default function ({ PetController }) {
  const router = Router();

  router.get("/:id", PetController.get);
  router.get("", AccessControl("Pet", "read"), PetController.getAll);
  //router.get("/user/:userId", PetController.getUserPets);
  router.post("/register", PetController.create);
  router.patch("/:id", PetController.update);
  router.delete("/:id", PetController.delete);

  return router;
}