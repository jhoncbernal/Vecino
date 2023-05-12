import { Router } from "express";
import { AccessControl } from "../../middlewares/index.js";

export default function ({ PlanController }) {
  const router = Router();

  router.get("/:id", PlanController.get);
  router.get("", AccessControl("Plan", "read"), PlanController.getAll);
  router.post("/register", PlanController.create);
  router.patch("/:id", PlanController.update);
  router.delete("/:id", PlanController.delete);

  return router;
};
