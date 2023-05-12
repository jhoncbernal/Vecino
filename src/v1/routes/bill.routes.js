const { Router } = require("express");
const { AuthMiddleware, HasPermissionMiddleware,ParseIntMiddleware}  = require('../middlewares');
module.exports = function ({ BillController }) {
    const router = Router();
    router.get('/:billId',BillController.get);
    router.get(
      "",
      [AuthMiddleware, HasPermissionMiddleware,ParseIntMiddleware],
      BillController.getBillsByUser
    );
    router.get(
      "/provider/1",
      [AuthMiddleware, HasPermissionMiddleware,ParseIntMiddleware],
      BillController.getBillsByProvider
    );
    router.patch('/:billId',[AuthMiddleware, HasPermissionMiddleware], BillController.update);
    router.delete('/:billId',[AuthMiddleware, HasPermissionMiddleware], BillController.delete);
    router.post('/',[AuthMiddleware, HasPermissionMiddleware], BillController.create)
    return router;
};