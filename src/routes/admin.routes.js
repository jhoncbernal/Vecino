const { Router } = require("express");
const { CACHE_TIME } = require('../helpers');
const { AuthMiddlewareAdmin, AuthMiddlewareOwner, ParseIntMiddleware, CacheMiddleware } = require('../middlewares');
module.exports = function ({ AdminController }) {
    const router = Router();
    router.get('/:adminId', AuthMiddlewareAdmin, AdminController.get);
    router.get('', [AuthMiddlewareOwner, ParseIntMiddleware, CacheMiddleware(CACHE_TIME.ONE_HOUR)], AdminController.getAll);
    router.patch('/:adminId', AuthMiddlewareAdmin, AdminController.update);
    router.delete('/:adminId', AuthMiddlewareOwner, AdminController.delete);
    router.post('/', AuthMiddlewareOwner, AdminController.create)
    router.get('/names/1', AdminController.getAllNames);
    return router;
};