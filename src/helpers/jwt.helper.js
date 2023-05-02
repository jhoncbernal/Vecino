import { sign } from 'jsonwebtoken';
import { JWT_SECRET } from '../config';

function generateToken(user){
    return sign({user},JWT_SECRET,{expiresIn:"10d"});
}
function generateTokenAdmin(user){
    return sign({ user }, JWT_SECRET, { expiresIn: "10d" });
}
function generateTokenOwner(user){
    return sign({ user }, JWT_SECRET, { expiresIn: "10d" });
}
export default{
    generateToken,
    generateTokenAdmin,
    generateTokenOwner
}