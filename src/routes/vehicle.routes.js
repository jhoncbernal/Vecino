const {Router}=require("express");
const {AuthMiddleware,ParseIntMiddleware,}=require('../middlewares');
module.exports=function({VehicleController}){
    const router=Router();
    router.get('/:vehicleId',AuthMiddleware,VehicleController.get);
    router.get('',[AuthMiddleware,ParseIntMiddleware],VehicleController.getAll);
    router.patch('/:vehicleId',AuthMiddleware,VehicleController.update);
    router.delete('/:vehicleId',AuthMiddleware,VehicleController.delete);
    router.post('',AuthMiddleware,VehicleController.create)
    router.get('/plate/:plate',AuthMiddleware,VehicleController.getVehicleByPlate)
    return router;
};