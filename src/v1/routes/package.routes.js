const { Router } = require("express");
const { AuthMiddleware, HasPermissionMiddleware } = require("../middlewares");

module.exports = function ({ PackageController }) {
  const router = Router();
  router.get(
    "/:packageId",
    [AuthMiddleware, HasPermissionMiddleware],
    PackageController.get
  );
  router.get(
    "/admin/:adminUuid",
    [AuthMiddleware, HasPermissionMiddleware],
    PackageController.getAllByAdmin
  );
  router.post(
    "",
    [AuthMiddleware, HasPermissionMiddleware],
    PackageController.create
  );
  router.patch(
    "/:packageId",
    [AuthMiddleware, HasPermissionMiddleware],
    PackageController.update
  );
  router.delete(
    "/:packageId",
    [AuthMiddleware, HasPermissionMiddleware],
    PackageController.delete
  );
  router.get(
    "/user/:userUuid",
    [AuthMiddleware, HasPermissionMiddleware],
    PackageController.getPackagesByUserUuid
  );
  router.get(
    "/packageCode/:packageCode",
    [AuthMiddleware, HasPermissionMiddleware],
    PackageController.getPackageByPackageCode
  );
  router.get(
    "/packages/deliveryCompanies",
    [AuthMiddleware, HasPermissionMiddleware],
    PackageController.getAllDeliveryCompanies
  );
  router.get(
    "/pin/:pinId",
    [AuthMiddleware, HasPermissionMiddleware],
    PackageController.getPackageByPin
  );
  router.patch(
    "/pin/:pinId",
    [AuthMiddleware, HasPermissionMiddleware],
    PackageController.updatePackageStatusByPIN
  );
  return router;
};
