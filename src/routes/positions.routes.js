const {Router}=require("express");
const {
  AuthMiddleware,
  HasPermissionMiddleware
} = require("../middlewares");
module.exports=function({ParkingSpaceController}){
    const router=Router();

    //positions
    router.get('/:parkingname',[AuthMiddleware, HasPermissionMiddleware],ParkingSpaceController.getAllParkingPositionEmptySpaceByVehicleType);
    router.get('/:parkingname/:positionnumber',[AuthMiddleware, HasPermissionMiddleware],ParkingSpaceController.getParkingPositionByPosNumber);
    router.patch('/:parkingname/:positionnumber',[AuthMiddleware, HasPermissionMiddleware],ParkingSpaceController.updateParkingPositionByPosnumber);
    router.delete('/:parkingname/:positionnumber',[AuthMiddleware, HasPermissionMiddleware],ParkingSpaceController.deleteParkingPositionByPosnumber);
    router.post('/:parkingname',[AuthMiddleware, HasPermissionMiddleware],ParkingSpaceController.createParkingPositions)

   
   
    return router;
};