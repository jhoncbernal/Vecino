const { Router } = require("express");
const { CACHE_TIME } = require('../helpers');
const { AuthMiddlewareAdmin, AuthMiddlewareOwner, ParseIntMiddleware, CacheMiddleware } = require('../middlewares');
module.exports = function ({ ProviderController }) {
    const router = Router();
    router.get('/:providerId', AuthMiddlewareAdmin, ProviderController.get);
    router.get('', [AuthMiddlewareOwner, ParseIntMiddleware, CacheMiddleware(CACHE_TIME.ONE_HOUR)], ProviderController.getAll);
    router.patch('/:providerId', AuthMiddlewareAdmin, ProviderController.update);
    router.delete('/:providerId', AuthMiddlewareOwner, ProviderController.delete);
    router.post('/', AuthMiddlewareOwner, ProviderController.create)
    router.get('/names/:city', ProviderController.getAllNames);
    router.get('/cities/1', ProviderController.getAllCities);
    return router;
};