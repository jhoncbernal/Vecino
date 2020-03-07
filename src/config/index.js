if(process.env.NODE_ENV!=='production'){
    require('dotenv').config();
}
module.exports={
    PORT:process.env.PORT,
    MONGO_URI:process.env.MONGO_URI,
    APPLICATION_NAME:process.env.APPLICATION_NAME,
    JWT_SECRET:process.env.JWT_SECRET,
    JWT_SECRETADMIN:process.env.JWT_SECRETADMIN,
    JWT_SECRETOWNER:process.env.JWT_SECRETOWNER,
    CACHE_KEY:process.env.CACHE_KEY,
    PSWD_EMAIL:process.env.PSWD_EMAIL,
    FROM_EMAIL:process.env.FROM_EMAIL,
    SECRET_OWNER:process.env.SECRET_OWNER,
    BLNMAILTRAP:process.env.BLNMAILTRAP
}