import { Router } from "express";

export default function ({ NotificationController }) {
  const router = Router();

  router.get("/:id", NotificationController.get);
  router.get("", NotificationController.getAll);
  //router.get("/user/:userId", NotificationController.getUserNotifications);
  router.post("/register", NotificationController.create);
  router.patch("/:id", NotificationController.update);
  router.delete("/:id", NotificationController.delete);

  return router;
}