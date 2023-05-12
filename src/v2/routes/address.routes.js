import { Router } from "express";
import { AccessControl } from "../../middlewares/index.js";

export default function ({ AddressController }) {
  const router = Router();

  router.get("/:id", AddressController.get);
  router.get("", AccessControl("Address", "read"), AddressController.getAll);
  //router.get("/user/:userId", AddressController.getUserAddresss);
  router.post("/register", AddressController.create);
  router.patch("/:id", AddressController.update);
  router.delete("/:id", AddressController.delete);

  return router;
}