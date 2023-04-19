const {Router}=require("express");
const {AuthMiddleware,ParseIntMiddleware,}=require('../middlewares');
module.exports=function({ParkingSpaceController}){
    const router=Router();
    router.get('/:parkingname',AuthMiddleware,ParkingSpaceController.get);
    router.get('',[AuthMiddleware,ParseIntMiddleware],ParkingSpaceController.getAll);
    router.patch('/:parkingname',AuthMiddleware,ParkingSpaceController.update);
    router.delete('/:parkingname',AuthMiddleware,ParkingSpaceController.delete);
    router.post('',AuthMiddleware,ParkingSpaceController.create)
   
    return router;
};