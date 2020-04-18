const { Router } = require("express");
const { CACHE_TIME } = require('../helpers');
const { AuthMiddleware,AuthMiddlewareAdmin,AuthMiddlewareOwner, ParseIntMiddleware, CacheMiddleware } = require('../middlewares');
module.exports = function ({ BillController }) {
    const router = Router();
    router.get('/:billId',BillController.get);
    router.get('', [AuthMiddleware,ParseIntMiddleware], BillController.getBillsByUser);
    router.get('/provider/1', [AuthMiddlewareAdmin,ParseIntMiddleware], BillController.getBillsByProvider);
    router.patch('/:billId', AuthMiddlewareAdmin, BillController.update);
    router.delete('/:billId', AuthMiddlewareOwner, BillController.delete);
    router.post('/', AuthMiddleware, BillController.create)
    return router;
};