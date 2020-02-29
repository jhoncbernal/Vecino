const jwt = require("jsonwebtoken");
const {JWT_SECRET}= require('../config');
module.exports= function(req,res,next){
const token =req.headers['authorization'];
if(!token){
    const error= new Error();
    error.status=401;
    error.message="token must be sent";
    throw error;
}
jwt.verify(token,JWT_SECRET,function(err,decodedToken){
    if(err){
        const error= new Error();
        error.message="validate token value";
        error.status=401;
        throw error;
    }
  
    req.user=decodedToken.user;
    next();

});
}