const { Router } = require("express");

module.exports = function ({ AddressController }) {
  const router = Router();

  router.get("/:id", AddressController.get);
  router.get("", AddressController.getAll);
  //router.get("/user/:userId", AddressController.getUserAddresss);
  router.post("/register", AddressController.create);
  router.patch("/:id", AddressController.update);
  router.delete("/:id", AddressController.delete);

  return router;
}