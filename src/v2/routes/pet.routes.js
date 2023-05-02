import { Router } from "express";

export default function ({ PetController }) {
  const router = Router();

  router.get("/:id", PetController.get);
  router.get("", PetController.getAll);
  //router.get("/user/:userId", PetController.getUserPets);
  router.post("/register", PetController.create);
  router.patch("/:id", PetController.update);
  router.delete("/:id", PetController.delete);

  return router;
}