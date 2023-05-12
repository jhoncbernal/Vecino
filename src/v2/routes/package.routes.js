import { Router } from "express";
import { AccessControl } from "../../middlewares/index.js";

export default function ({ PackageController }) {
  const router = Router();

  router.get("/:id", PackageController.get);
  router.get("", AccessControl("Package", "read"), PackageController.getAll);
  //router.get("/user/:userId", PackageController.getUserPackages);
  router.post("/register", PackageController.create);
  router.patch("/:id", PackageController.update);
  router.delete("/:id", PackageController.delete);

  return router;
}