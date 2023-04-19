const {Router}=require("express");
const {
  AuthMiddleware,
  HasPermissionMiddleware,ParseIntMiddleware,
} = require("../middlewares");
module.exports=function({UserController}){
    const router=Router();
    router.get('/:userId',[AuthMiddleware, HasPermissionMiddleware],UserController.get);
    router.get(
      "",
      [AuthMiddleware, HasPermissionMiddleware,ParseIntMiddleware],
      UserController.getAll
    );
    router.get('/propety/:otro',UserController.getUsersByPropertyInfo);
   
    router.patch('/:userId',UserController.update);
    router.delete('/:userId',[AuthMiddleware, HasPermissionMiddleware],UserController.delete)
    router.get('/bestpoints/:decendente',[AuthMiddleware,ParseIntMiddleware],UserController.getUsersByPoints);
    return router;
};