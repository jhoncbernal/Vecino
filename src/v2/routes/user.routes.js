import { Router } from "express";
import { AccessControl } from "../../middlewares/index.js";

export default function ({ UserController }) {
  const router = Router();

  router.get("/:id", UserController.get);
  router.get("",AccessControl("User","read"), UserController.getAll);
  router.post("/register", UserController.create);
  router.patch("/:id", UserController.update);
  router.delete("/:id", UserController.delete);

  return router;
}