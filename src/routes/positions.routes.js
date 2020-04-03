const {Router}=require("express");
const {AuthMiddlewareAdmin,ParseIntMiddleware,CacheMiddleware}=require('../middlewares');
const {CACHE_TIME} = require('../helpers')
module.exports=function({ParkingSpaceController}){
    const router=Router();

    //positions
    router.get('/:parkingname',AuthMiddlewareAdmin,ParkingSpaceController.getAllParkingPositionEmptySpaceByVehicleType);
    router.get('/:parkingname/:positionnumber',AuthMiddlewareAdmin,ParkingSpaceController.getParkingPositionByPosNumber);
    router.patch('/:parkingname/:positionnumber',AuthMiddlewareAdmin,ParkingSpaceController.updateParkingPositionByPosnumber);
    router.delete('/:parkingname/:positionnumber',AuthMiddlewareAdmin,ParkingSpaceController.deleteParkingPositionByPosnumber);
    router.post('/:parkingname',AuthMiddlewareAdmin,ParkingSpaceController.createParkingPositions)

   
   
    return router;
};