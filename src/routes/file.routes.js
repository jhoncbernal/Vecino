const {Router}= require('express');

const {AuthMiddlewareAdmin}=require('../middlewares');
module.exports=function({FileController}){
    const router=Router(); 
    router.post('',AuthMiddlewareAdmin, FileController.uploadFileCSV);
    router.post('/images/upload',AuthMiddlewareAdmin, FileController.uploadFileImage);
    return router;
}
