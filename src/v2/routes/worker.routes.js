import { Router } from "express";
import { AccessControl } from "../../middlewares/index.js";

export default function ({ WorkerController }) {
  const router = Router();

  router.get("/:id", WorkerController.get);
  router.get("", AccessControl("Worker", "read"), WorkerController.getAll);
  //router.get("/user/:userId", WorkerController.getUserWorkers);
  router.post("/register", WorkerController.create);
  router.patch("/:id", WorkerController.update);
  router.delete("/:id", WorkerController.delete);

  return router;
}