const {Router}=require("express");
const {AuthMiddleware,AuthMiddlewareAdmin,ParseIntMiddleware,CacheMiddleware}=require('../middlewares');
const {CACHE_TIME} = require('../helpers')
module.exports=function({UserController}){
    const router=Router();
    router.get('/:userId',AuthMiddleware,UserController.get);
    router.get('',[AuthMiddlewareAdmin,ParseIntMiddleware,CacheMiddleware(CACHE_TIME.HALF_HOUR)],UserController.getAll);
    router.patch('/:userId',AuthMiddleware,UserController.update);
    router.delete('/:userId',AuthMiddleware,UserController.delete)
    return router;
};