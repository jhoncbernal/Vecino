const { Router } = require("express");

module.exports = function ({ BillController }) {
  const router = Router();

  router.get("/:billId", BillController.get);
  router.get("", BillController.getAll);
  //router.get("/user/:userId", BillController.getUserBills);
  router.post("", BillController.create);
  router.patch("/:billId", BillController.update);
  router.delete("/:billId", BillController.delete);

  return router;
}