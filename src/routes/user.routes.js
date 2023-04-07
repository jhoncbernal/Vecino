const {Router}=require("express");
const {AuthMiddleware,AuthMiddlewareAdmin,ParseIntMiddleware,CacheMiddleware}=require('../middlewares');
const {CACHE_TIME} = require('../helpers')
module.exports=function({UserController}){
    const router=Router();
    router.get('/:userId',AuthMiddleware,UserController.get);
    router.get('',[AuthMiddlewareAdmin,ParseIntMiddleware],UserController.getAll);
    router.get('/propety/:otro',UserController.getUsersByPropertyInfo);
   
    router.patch('/:userId',UserController.update);
    router.delete('/:userId',AuthMiddleware,UserController.delete)
    router.get('/bestpoints/:decendente',[AuthMiddlewareAdmin,ParseIntMiddleware],UserController.getUsersByPoints);
    return router;
};