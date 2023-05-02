import { Router } from "express";

export default function ({ PackageController }) {
  const router = Router();

  router.get("/:id", PackageController.get);
  router.get("", PackageController.getAll);
  //router.get("/user/:userId", PackageController.getUserPackages);
  router.post("/register", PackageController.create);
  router.patch("/:id", PackageController.update);
  router.delete("/:id", PackageController.delete);

  return router;
}