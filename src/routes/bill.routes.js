const { Router } = require("express");
const { AuthMiddleware, ParseIntMiddleware}  = require('../middlewares');
module.exports = function ({ BillController }) {
    const router = Router();
    router.get('/:billId',BillController.get);
    router.get('', [AuthMiddleware,ParseIntMiddleware], BillController.getBillsByUser);
    router.get('/provider/1', [AuthMiddleware,ParseIntMiddleware], BillController.getBillsByProvider);
    router.patch('/:billId', AuthMiddleware, BillController.update);
    router.delete('/:billId', AuthMiddleware, BillController.delete);
    router.post('/', AuthMiddleware, BillController.create)
    return router;
};