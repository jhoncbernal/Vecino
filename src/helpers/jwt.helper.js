const {sign}= require('jsonwebtoken');
const {JWT_SECRET}= require('../config');

function generateToken(user){
    return sign({user},JWT_SECRET,{expiresIn:"10d"});
}
function generateTokenAdmin(user){
    return sign({ user }, JWT_SECRET, { expiresIn: "10d" });
}
function generateTokenOwner(user){
    return sign({ user }, JWT_SECRET, { expiresIn: "10d" });
}
module.exports={
    generateToken,
    generateTokenAdmin,
    generateTokenOwner
}