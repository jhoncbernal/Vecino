const {Router}= require('express');

const {AuthMiddlewareAdmin,ParseIntMiddleware}=require('../middlewares');
module.exports=function({FileController}){
    const router=Router(); 
    router.post('',AuthMiddlewareAdmin, FileController.uploadFileCSV);
    return router;
}
