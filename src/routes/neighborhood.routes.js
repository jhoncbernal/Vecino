const {Router}=require("express");
const {CACHE_TIME} = require('../helpers');
const {AuthMiddlewareAdmin,AuthMiddlewareOwner,ParseIntMiddleware,CacheMiddleware}=require('../middlewares');
module.exports=function({NeighborhoodController}){
    const router=Router();
    router.get('/:neighborhoodId',AuthMiddlewareAdmin,NeighborhoodController.get);
    router.get('',[AuthMiddlewareOwner,ParseIntMiddleware,CacheMiddleware(CACHE_TIME.ONE_HOUR)],NeighborhoodController.getAll);
    router.patch('/:neighborhoodId',AuthMiddlewareAdmin,NeighborhoodController.update);
    router.delete('/:neighborhoodId',AuthMiddlewareOwner,NeighborhoodController.delete)
    return router;
};