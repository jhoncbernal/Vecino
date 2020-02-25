const {Router}=require("express");
const {AuthMiddlewareAdmin,ParseIntMiddleware,CacheMiddleware}=require('../middlewares');
const {CACHE_TIME} = require('../helpers')
module.exports=function({ParkingSpaceController}){
    const router=Router();

    //positions
    router.get('/:parkingspaceId',AuthMiddlewareAdmin,ParkingSpaceController.getAllParkingPositionEmptySpaceByVehicleType);
    router.get('/:parkingspaceId/:positionnumber',AuthMiddlewareAdmin,ParkingSpaceController.getParkingPositionByPosNumber);
    router.patch('/:parkingspaceId/:positionnumber',AuthMiddlewareAdmin,ParkingSpaceController.updateParkingPositionByPosnumber);
    router.delete('/:parkingspaceId/:positionnumber',AuthMiddlewareAdmin,ParkingSpaceController.deleteParkingPositionByPosnumber);
    router.post('/:parkingspaceId',AuthMiddlewareAdmin,ParkingSpaceController.createParkingPositions)

   
   
    return router;
};