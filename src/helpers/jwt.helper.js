const {sign}= require('jsonwebtoken');
const {JWT_SECRET,JWT_SECRETOWNER,JWT_SECRETADMIN}= require('../config');

function generateToken(user){
    return sign({user},JWT_SECRET,{expiresIn:"4h"});
}
function generateTokenAdmin(user){
    return sign({user},JWT_SECRETADMIN,{expiresIn:"8h"});
}
function generateTokenOwner(user){
    return sign({user},JWT_SECRETOWNER,{expiresIn:"4h"});
}
module.exports={
    generateToken,
    generateTokenAdmin,
    generateTokenOwner
}