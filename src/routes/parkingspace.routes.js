const {Router}=require("express");
const {AuthMiddlewareAdmin,ParseIntMiddleware,CacheMiddleware}=require('../middlewares');
const {CACHE_TIME} = require('../helpers')
module.exports=function({ParkingSpaceController}){
    const router=Router();
    router.get('/:parkingspaceId',AuthMiddlewareAdmin,ParkingSpaceController.get);
    router.get('',[AuthMiddlewareAdmin,ParseIntMiddleware,CacheMiddleware(CACHE_TIME.ONE_HOUR)],ParkingSpaceController.getAll);
    router.patch('/:parkingspaceId',AuthMiddlewareAdmin,ParkingSpaceController.update);
    router.delete('/:parkingspaceId',AuthMiddlewareAdmin,ParkingSpaceController.delete);
    router.post('',AuthMiddlewareAdmin,ParkingSpaceController.create)
   
    return router;
};