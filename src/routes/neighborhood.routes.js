const {Router}=require("express");
const {AuthMiddlewareAdmin,AuthMiddlewareOwner,ParseIntMiddleware,CacheMiddleware}=require('../middlewares');
module.exports=function({NeighborhoodController}){
    const router=Router();
    router.get('/:neighborhoodId',AuthMiddlewareAdmin,NeighborhoodController.get);
    router.get('',[AuthMiddlewareOwner,ParseIntMiddleware],NeighborhoodController.getAll);
    router.patch('/:neighborhoodId',AuthMiddlewareAdmin,NeighborhoodController.update);
    router.delete('/:neighborhoodId',AuthMiddlewareOwner,NeighborhoodController.delete)
    return router;
};