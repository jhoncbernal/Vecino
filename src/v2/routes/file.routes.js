import { Router } from "express";

export default function ({ FileController }) {
  const router = Router();

  router.get("/:id", FileController.get);
  router.get("", FileController.getAll);
  //router.get("/user/:userId", FileController.getUserFiles);
  router.post("", FileController.create);
  router.patch("/:id", FileController.update);
  router.delete("/:id", FileController.delete);

  return router;
}