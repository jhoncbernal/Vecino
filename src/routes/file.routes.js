const {Router}= require('express');
var template = require('../public/templates/templatedata.js');
var path = require('path');

module.exports=function({FileController}){
    const router=Router();
    router.get('/template', FileController.getExampledata);
    router.get('', function (req, res) {
        res.sendFile(path.join(__dirname, '/../public/pages/fileupload.html'));});
    router.post('', FileController.uploadFileCSV);
    return router;
}
