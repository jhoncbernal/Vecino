const { Router } = require("express");
const { CACHE_TIME } = require('../helpers');
const { AuthMiddleware,AuthMiddlewareAdmin, ParseIntMiddleware, CacheMiddleware } = require('../middlewares');
module.exports = function ({ ProductController }) {
    const router = Router();
    router.get('/:productId', AuthMiddleware,ProductController.get);
    router.get('', [AuthMiddleware, ParseIntMiddleware, CacheMiddleware(CACHE_TIME.ONE_HOUR)], ProductController.getAll);
    router.patch('/:productId', AuthMiddlewareAdmin, ProductController.update);
    router.delete('/:productId', AuthMiddlewareAdmin, ProductController.delete);
    router.post('/', AuthMiddlewareAdmin, ProductController.create)
    return router;
};