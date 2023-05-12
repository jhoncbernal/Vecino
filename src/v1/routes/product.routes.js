const { Router } = require("express");
const {
  AuthMiddleware,
  HasPermissionMiddleware,ParseIntMiddleware,
} = require("../middlewares");
module.exports = function ({ ProductController }) {
    const router = Router();
    router.get('/:productId',ProductController.get);
    router.get('/productsPrice/1',[AuthMiddleware, HasPermissionMiddleware],ProductController.getProductsTotalPrice);
    router.get('', ParseIntMiddleware, ProductController.getAll);
    router.patch('/:productId',[AuthMiddleware, HasPermissionMiddleware], ProductController.update);
    router.patch('/productsPrice/1',[AuthMiddleware, HasPermissionMiddleware], ProductController.updateProductsQuantity);
    router.delete('/:productId',[AuthMiddleware, HasPermissionMiddleware], ProductController.delete);
    router.post('/',[AuthMiddleware, HasPermissionMiddleware], ProductController.create)
    return router;
};