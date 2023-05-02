import dotenv from "dotenv";
dotenv.config();
export const PORT = process.env.PORT;
export const PROJECT = {
  name: process.env.PROJECT_NAME,
  mode: process.env.PROJECT_MODE,
  environment: process.env.PROJECT_MODE,
  version: process.env.PROJECT_VERSION,
};
export const SERVER = {
  hostname: process.env.SERVER_HOSTNAME,
  port: process.env.PORT || process.env.SERVER_PORT,
};
export const MONGO_DB = {
  hostname: process.env.MONGODB_HOSTNAME,
  port: process.env.MONGODB_PORT,
  database: process.env.MONGODB_DATABASE,
  username: process.env.MONGODB_USERNAME,
  password: process.env.MONGODB_PASSWORD,
};
export const FRONT_END_URL = process.env.FRONT_END_URL;
export const APPLICATION_NAME = process.env.APPLICATION_NAME;
export const JWT_SECRET = process.env.JWT_SECRET;
export const CACHE_KEY = process.env.CACHE_KEY;
export const PSWD_EMAIL = process.env.PSWD_EMAIL;
export const FROM_EMAIL = process.env.FROM_EMAIL;
export const SECRET_OWNER = process.env.SECRET_OWNER;
export const BLNMAILTRAP = process.env.BLNMAILTRAP;
export const AWSACCESSKEYID = process.env.AWSACCESSKEYID;
export const AWSSECRETACCESSKEY = process.env.AWSSECRETACCESSKEY;
export const AWSREGION = process.env.AWSREGION;
export const AWSBUCKETIMG = process.env.AWSBUCKETIMG;
export const HOST = process.env.HOST;
export const API = process.env.API;
export const FRONT = process.env.FRONT;
