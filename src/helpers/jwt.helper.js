const {sign}= require('jsonwebtoken');
const {JWT_SECRET,JWT_SECRETOWNER,JWT_SECRETADMIN}= require('../config');

function generateToken(user){
    return sign({user},JWT_SECRET,{expiresIn:"30d"});
}
function generateTokenAdmin(user){
    return sign({user},JWT_SECRETADMIN,{expiresIn:"30d"});
}
function generateTokenOwner(user){
    return sign({user},JWT_SECRETOWNER,{expiresIn:"30d"});
}
module.exports={
    generateToken,
    generateTokenAdmin,
    generateTokenOwner
}