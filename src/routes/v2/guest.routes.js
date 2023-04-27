const { Router } = require("express");

module.exports = function ({ GuestController }) {
  const router = Router();

  router.get("/:guestId", GuestController.get);
  router.get("", GuestController.getAll);
  //router.get("/user/:userId", GuestController.getUserGuests);
  router.post("", GuestController.create);
  router.patch("/:guestId", GuestController.update);
  router.delete("/:guestId", GuestController.delete);

  return router;
}