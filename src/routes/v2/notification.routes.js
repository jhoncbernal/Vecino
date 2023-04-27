const { Router } = require("express");

module.exports = function ({ NotificationController }) {
  const router = Router();

  router.get("/:notificationId", NotificationController.get);
  router.get("", NotificationController.getAll);
  //router.get("/user/:userId", NotificationController.getUserNotifications);
  router.post("", NotificationController.create);
  router.patch("/:notificationId", NotificationController.update);
  router.delete("/:notificationId", NotificationController.delete);

  return router;
}