const { Router } = require("express");
const { AuthMiddleware, ParseIntMiddleware}  = require('../middlewares');
module.exports = function ({ ProviderController }) {
    const router = Router();
    router.get('/:providerId', AuthMiddleware, ProviderController.get);
    router.get('', [AuthMiddleware, ParseIntMiddleware], ProviderController.getAll);
    router.patch('/:providerId', AuthMiddleware, ProviderController.update);
    router.delete('/:providerId', AuthMiddleware, ProviderController.delete);
    router.post('/', AuthMiddleware, ProviderController.create)
    router.get('/names/:city', ProviderController.getAllNames);
    router.get('/cities/1', ProviderController.getAllCities);
    return router;
};