if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
module.exports = {
  PORT: process.env.PORT,
  PROJECT: {
    name: process.env.PROJECT_NAME,
    mode: process.env.PROJECT_MODE,
    environment: process.env.PROJECT_MODE,
    version: process.env.PROJECT_VERSION,
  },
  SERVER: {
    hostname: process.env.SERVER_HOSTNAME,
    port: process.env.SERVER_PORT,
  },
  MONGO_DB: {
    hostname: process.env.MONGODB_HOSTNAME,
    port: process.env.MONGODB_PORT,
    database: process.env.MONGODB_DATABASE,
    username: process.env.MONGODB_USERNAME,
    password: process.env.MONGODB_PASSWORD,
  },
  APPLICATION_NAME: process.env.APPLICATION_NAME,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_SECRETADMIN: process.env.JWT_SECRETADMIN,
  JWT_SECRETOWNER: process.env.JWT_SECRETOWNER,
  CACHE_KEY: process.env.CACHE_KEY,
  PSWD_EMAIL: process.env.PSWD_EMAIL,
  FROM_EMAIL: process.env.FROM_EMAIL,
  SECRET_OWNER: process.env.SECRET_OWNER,
  BLNMAILTRAP: process.env.BLNMAILTRAP,
  AWSACCESSKEYID: process.env.AWSACCESSKEYID,
  AWSSECRETACCESSKEY: process.env.AWSSECRETACCESSKEY,
  AWSREGION: process.env.AWSREGION,
  AWSBUCKETIMG: process.env.AWSBUCKETIMG,
  HOST: process.env.HOST,
  API: process.env.API,
  FRONT: process.env.FRONT,
};
