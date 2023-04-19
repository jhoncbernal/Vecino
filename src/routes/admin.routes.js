const { Router } = require("express");
const {AuthMiddleware, ParseIntMiddleware}  = require('../middlewares');
module.exports = function ({ AdminController }) {
    const router = Router();
    router.get("/:adminId", AuthMiddleware, AdminController.get);
    router.get("", [AuthMiddleware,ParseIntMiddleware], AdminController.getAll);
    router.patch("/:adminId", AuthMiddleware, AdminController.update);
    router.delete('/:adminId', AuthMiddleware, AdminController.delete);
    router.post('/', AuthMiddleware, AdminController.create)
    router.get('/names/:id', AdminController.getAllNames);
    router.get("/city/:city", AdminController.getAllAdminsBasicInfoByCity);
    return router;
};