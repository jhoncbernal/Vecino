const { Router } = require("express");
const { CACHE_TIME } = require('../helpers');
const { AuthMiddlewareAdmin, AuthMiddlewareOwner, ParseIntMiddleware, CacheMiddleware } = require('../middlewares');
module.exports = function ({ AdminController }) {
    const router = Router();
    router.get('/:adminId', AuthMiddlewareAdmin, AdminController.get);
    router.get('', [AuthMiddlewareOwner, ParseIntMiddleware], AdminController.getAll);
    router.patch('/:adminId', AuthMiddlewareAdmin, AdminController.update);
    router.delete('/:adminId', AuthMiddlewareOwner, AdminController.delete);
    router.post('/', AuthMiddlewareOwner, AdminController.create)
    router.get('/names/:id', AdminController.getAllNames);
    router.get("/city/:city", AdminController.getAllAdminsBasicInfoByCity);
    return router;
};