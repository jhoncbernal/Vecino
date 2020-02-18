const {Router}=require("express");
const {AuthMiddleware,ParseIntMiddleware,CacheMiddleware}=require('../middlewares');
const {CACHE_TIME} = require('../helpers')
module.exports=function({NeighborhoodController}){
    const router=Router();
    router.get('/:neighborhoodId',NeighborhoodController.get);
    router.get('',[ParseIntMiddleware,CacheMiddleware(CACHE_TIME.ONE_HOUR)],NeighborhoodController.getAll);
    router.patch('/:neighborhoodId',NeighborhoodController.update);
    router.delete('/:neighborhoodId',NeighborhoodController.delete)
    return router;
};