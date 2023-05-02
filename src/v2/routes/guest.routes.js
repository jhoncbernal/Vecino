import { Router } from "express";

export default function ({ GuestController }) {
  const router = Router();

  router.get("/:id", GuestController.get);
  router.get("", GuestController.getAll);
  //router.get("/user/:userId", GuestController.getUserGuests);
  router.post("", GuestController.create);
  router.patch("/:id", GuestController.update);
  router.delete("/:id", GuestController.delete);

  return router;
}