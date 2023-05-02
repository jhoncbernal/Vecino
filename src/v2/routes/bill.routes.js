import { Router } from "express";

export default function ({ BillController }) {
  const router = Router();

  router.get("/:id", BillController.get);
  router.get("", BillController.getAll);
  //router.get("/user/:userId", BillController.getUserBills);
  router.post("", BillController.create);
  router.patch("/:id", BillController.update);
  router.delete("/:id", BillController.delete);

  return router;
}