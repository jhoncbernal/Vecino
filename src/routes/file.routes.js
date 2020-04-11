const {Router}= require('express');

const {AuthMiddlewareAdmin}=require('../middlewares');
module.exports=function({FileController}){
    const router=Router(); 
    router.post('',AuthMiddlewareAdmin, FileController.uploadFileCSV);
    router.post('/images/upload', FileController.uploadFileImage);
    return router;
}
