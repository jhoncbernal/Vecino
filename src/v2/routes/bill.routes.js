import { Router } from "express";
import { AccessControl } from "../../middlewares/index.js";

export default function ({ BillController }) {
  const router = Router();

  router.get("/:id", BillController.get);
  router.get("", AccessControl("Bill", "read"), BillController.getAll);
  //router.get("/user/:userId", BillController.getUserBills);
  router.post("/register", BillController.create);
  router.patch("/:id", BillController.update);
  router.delete("/:id", BillController.delete);

  return router;
}