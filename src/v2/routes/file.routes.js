import { Router } from "express";
import { AccessControl } from "../../middlewares/index.js";

export default function ({ FileController }) {
  const router = Router();

  router.get("/:id", FileController.get);
  router.get("",AccessControl("File","read"), FileController.getAll);
  //router.get("/user/:userId", FileController.getUserFiles);
  router.post("/register", FileController.create);
  router.patch("/:id", FileController.update);
  router.delete("/:id", FileController.delete);

  return router;
}