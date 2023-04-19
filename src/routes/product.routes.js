const { Router } = require("express");
const { AuthMiddleware, ParseIntMiddleware}  = require('../middlewares');
module.exports = function ({ ProductController }) {
    const router = Router();
    router.get('/:productId',ProductController.get);
    router.get('/productsPrice/1',AuthMiddleware,ProductController.getProductsTotalPrice);
    router.get('', ParseIntMiddleware, ProductController.getAll);
    router.patch('/:productId', AuthMiddleware, ProductController.update);
    router.patch('/productsPrice/1',AuthMiddleware, ProductController.updateProductsQuantity);
    router.delete('/:productId', AuthMiddleware, ProductController.delete);
    router.post('/', AuthMiddleware, ProductController.create)
    return router;
};