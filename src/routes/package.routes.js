const { Router } = require("express");

module.exports = function ({ PackageController }) {
  const router = Router();
  router.get("/:packageId", PackageController.get);
  router.post("", PackageController.create);
  router.patch("/:packageId", PackageController.update);
  router.delete("/:packageId", PackageController.delete);
  router.get("/user/:userUuid", PackageController.getPackagesByUserUuid);
  router.get("/pin/:pinId", PackageController.getPackageByPin);
  router.get(
    "/packageCode/:packageCode",
    PackageController.getPackageByPackageCode
  );
  return router;
};
