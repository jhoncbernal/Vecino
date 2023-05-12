const { Router } = require("express");
const {
  AuthMiddleware,
  HasPermissionMiddleware,
  ParseIntMiddleware,
} = require("../middlewares");
module.exports = function ({ AdminController }) {
    const router = Router();
    router.get("/:adminId",[AuthMiddleware, HasPermissionMiddleware], AdminController.get);
    router.get(
      "",
      [AuthMiddleware, HasPermissionMiddleware,ParseIntMiddleware],
      AdminController.getAll
    );
    router.patch("/:adminId",[AuthMiddleware, HasPermissionMiddleware], AdminController.update);
    router.delete('/:adminId',[AuthMiddleware, HasPermissionMiddleware], AdminController.delete);
    router.post('/',[AuthMiddleware, HasPermissionMiddleware], AdminController.create)
    router.get('/names/:id', AdminController.getAllNames);
    router.get("/city/:city", AdminController.getAllAdminsBasicInfoByCity);
    return router;
};