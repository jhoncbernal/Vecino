const {Router}=require("express");
const {AuthMiddleware,ParseIntMiddleware,}=require('../middlewares');
module.exports=function({ParkingSpaceController}){
    const router=Router();

    //positions
    router.get('/:parkingname',AuthMiddleware,ParkingSpaceController.getAllParkingPositionEmptySpaceByVehicleType);
    router.get('/:parkingname/:positionnumber',AuthMiddleware,ParkingSpaceController.getParkingPositionByPosNumber);
    router.patch('/:parkingname/:positionnumber',AuthMiddleware,ParkingSpaceController.updateParkingPositionByPosnumber);
    router.delete('/:parkingname/:positionnumber',AuthMiddleware,ParkingSpaceController.deleteParkingPositionByPosnumber);
    router.post('/:parkingname',AuthMiddleware,ParkingSpaceController.createParkingPositions)

   
   
    return router;
};