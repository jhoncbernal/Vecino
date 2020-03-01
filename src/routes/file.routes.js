const {Router}= require('express');
const path = require('path');
const {AuthMiddlewareAdmin,ParseIntMiddleware,CacheMiddleware}=require('../middlewares');
module.exports=function({FileController}){
    const router=Router();
    router.get('/template', AuthMiddlewareAdmin,FileController.getExampledata);
    router.get('', function (req, res) {
        res.sendFile(path.join(__dirname, '/../public/pages/fileupload.html'));});
    router.post('', FileController.uploadFileCSV);
    return router;
}
