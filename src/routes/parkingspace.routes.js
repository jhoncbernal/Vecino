const {Router}=require("express");
const {AuthMiddlewareAdmin,ParseIntMiddleware,CacheMiddleware}=require('../middlewares');
const {CACHE_TIME} = require('../helpers')
module.exports=function({ParkingSpaceController}){
    const router=Router();
    router.get('/:parkingname',AuthMiddlewareAdmin,ParkingSpaceController.get);
    router.get('',[AuthMiddlewareAdmin,ParseIntMiddleware],ParkingSpaceController.getAll);
    router.patch('/:parkingname',AuthMiddlewareAdmin,ParkingSpaceController.update);
    router.delete('/:parkingname',AuthMiddlewareAdmin,ParkingSpaceController.delete);
    router.post('',AuthMiddlewareAdmin,ParkingSpaceController.create)
   
    return router;
};