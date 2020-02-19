const {Router}=require("express");
const {AuthMiddleware,ParseIntMiddleware,CacheMiddleware}=require('../middlewares');
const {CACHE_TIME} = require('../helpers')
module.exports=function({VehicleController}){
    const router=Router();
    router.get('/:vehicleId',AuthMiddleware,VehicleController.get);
    router.get('',[AuthMiddleware,ParseIntMiddleware,CacheMiddleware(CACHE_TIME.ONE_HOUR)],VehicleController.getAll);
    router.patch('/:vehicleId',AuthMiddleware,VehicleController.update);
    router.delete('/:vehicleId',AuthMiddleware,VehicleController.delete);
    router.post('',AuthMiddleware,VehicleController.create)

    return router;
};