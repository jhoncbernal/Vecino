const {Router}= require('express');

const {AuthMiddlewareAdmin,ParseIntMiddleware,CacheMiddleware}=require('../middlewares');
module.exports=function({FileController}){
    const router=Router();
    router.get('/template', AuthMiddlewareAdmin,FileController.getExampledata);
    router.get('',FileController.get); 
    router.post('', FileController.uploadFileCSV);
    return router;
}
