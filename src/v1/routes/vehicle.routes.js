const {Router}=require("express");
const {
  AuthMiddleware,
  HasPermissionMiddleware,ParseIntMiddleware,
} = require("../middlewares");
module.exports=function({VehicleController}){
    const router=Router();
    router.get('/:vehicleId',[AuthMiddleware, HasPermissionMiddleware],VehicleController.get);
    router.get(
      "",
      [AuthMiddleware, HasPermissionMiddleware,ParseIntMiddleware],
      VehicleController.getAll
    );
    router.patch('/:vehicleId',[AuthMiddleware, HasPermissionMiddleware],VehicleController.update);
    router.delete('/:vehicleId',[AuthMiddleware, HasPermissionMiddleware],VehicleController.delete);
    router.post('',[AuthMiddleware, HasPermissionMiddleware],VehicleController.create)
    router.get('/plate/:plate',[AuthMiddleware, HasPermissionMiddleware],VehicleController.getVehicleByPlate)
    return router;
};