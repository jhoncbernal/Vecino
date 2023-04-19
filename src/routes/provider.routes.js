const { Router } = require("express");
const { AuthMiddleware,HasPermissionMiddleware, ParseIntMiddleware}  = require('../middlewares');
module.exports = function ({ ProviderController }) {
    const router = Router();
    router.get('/:providerId',[AuthMiddleware, HasPermissionMiddleware], ProviderController.get);
    router.get('', [AuthMiddleware,HasPermissionMiddleware, ParseIntMiddleware], ProviderController.getAll);
    router.patch('/:providerId',[AuthMiddleware, HasPermissionMiddleware], ProviderController.update);
    router.delete('/:providerId',[AuthMiddleware, HasPermissionMiddleware], ProviderController.delete);
    router.post('/',[AuthMiddleware, HasPermissionMiddleware], ProviderController.create)
    router.get('/names/:city', ProviderController.getAllNames);
    router.get('/cities/1', ProviderController.getAllCities);
    return router;
};