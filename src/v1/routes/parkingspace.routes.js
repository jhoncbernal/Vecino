const {Router}=require("express");
const {
  AuthMiddleware,
  HasPermissionMiddleware,ParseIntMiddleware,
} = require("../middlewares");
module.exports=function({ParkingSpaceController}){
    const router=Router();
    router.get('/:parkingname',[AuthMiddleware, HasPermissionMiddleware],ParkingSpaceController.get);
    router.get(
      "",
      [AuthMiddleware, HasPermissionMiddleware,ParseIntMiddleware],
      ParkingSpaceController.getAll
    );
    router.patch('/:parkingname',[AuthMiddleware, HasPermissionMiddleware],ParkingSpaceController.update);
    router.delete('/:parkingname',[AuthMiddleware, HasPermissionMiddleware],ParkingSpaceController.delete);
    router.post('',[AuthMiddleware, HasPermissionMiddleware],ParkingSpaceController.create)
   
    return router;
};