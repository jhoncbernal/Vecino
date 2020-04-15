const { Router } = require("express");
const { CACHE_TIME } = require('../helpers');
const { AuthMiddleware,AuthMiddlewareAdmin, ParseIntMiddleware, CacheMiddleware } = require('../middlewares');
module.exports = function ({ ProductController }) {
    const router = Router();
    router.get('/:productId',ProductController.get);
    router.get('', ParseIntMiddleware, ProductController.getAll);
    router.patch('/:productId', AuthMiddlewareAdmin, ProductController.update);
    router.delete('/:productId', AuthMiddlewareAdmin, ProductController.delete);
    router.post('/', AuthMiddlewareAdmin, ProductController.create)
    return router;
};