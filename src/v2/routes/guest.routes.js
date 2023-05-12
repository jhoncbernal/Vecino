import { Router } from "express";
import { AccessControl } from "../../middlewares/index.js";

export default function ({ GuestController }) {
  const router = Router();

  router.get("/:id", GuestController.get);
  router.get("", AccessControl("Guest", "read"), GuestController.getAll);
  //router.get("/user/:userId", GuestController.getUserGuests);
  router.post("/register", GuestController.create);
  router.patch("/:id", GuestController.update);
  router.delete("/:id", GuestController.delete);

  return router;
}