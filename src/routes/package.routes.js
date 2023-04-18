const { Router } = require("express");

module.exports = function ({ PackageController }) {
  const router = Router();
  router.get("/:packageId", PackageController.get);
  router.get("/admin/:adminUuid", PackageController.getAllByAdmin);
  router.post("", PackageController.create);
  router.patch("/:packageId", PackageController.update);
  router.delete("/:packageId", PackageController.delete);
  router.get("/user/:userUuid", PackageController.getPackagesByUserUuid);
  router.get(
    "/packageCode/:packageCode",
    PackageController.getPackageByPackageCode
  );
  router.get(
    "/packages/deliveryCompanies",
    PackageController.getAllDeliveryCompanies
  );
  router.get("/pin/:pinId", PackageController.getPackageByPin);
  router.patch("/pin/:pinId", PackageController.updatePackageStatusByPIN);
  return router;
};
