const jwt = require("jsonwebtoken");
const {JWT_SECRETADMIN}= require('../config');
module.exports= function(req,res,next){
const token =req.headers['authorization'];
if(!token){
    const error= new Error();
    error.status=401;
    error.message="token must be sent";
    throw error;
}
jwt.verify(token,JWT_SECRETADMIN,function(err,decodedToken){
    if(err){
        const error= new Error();
        error.message="Validate token access or token value";
        error.status=400;
        throw error;
    }
    req.user=decodedToken.user;
    next();
});

}