import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import {
  ErrorMiddleware,
  NotFoundMiddleware,
} from "../../middlewares/index.js";
import session from "express-session";
import passport from "../../utils/passport-setup.js";
import { JWT_SECRET, PROJECT, CORS_WHITELIST, REDIS } from "../../config/index.js";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
// Importing the connect-redis and redis packages
import redis from "redis";
import RedisStore from "connect-redis";

let redisClient;

if (PROJECT.environment === "production") {
  // Production environment
  const redisURL = new URL(REDIS.url); // Assumes you have REDIS_URL as an env variable in production
  redisClient = redis.createClient({
    port: redisURL.port,
    host: redisURL.hostname,
    password: redisURL.password,
    tls: {
      rejectUnauthorized: false,
    },
  });
} else {
  // Development environment
  redisClient = redis.createClient({
    host: "localhost", // The host on which the Redis server is running in your Docker container
    port: REDIS.port || 6379, // The port on which Redis is running in your Docker container
    password: REDIS.password, // The password you set for Redis in your Docker Compose file
  });
}
console.log("REDIS", redisClient);

redisClient.on("connect", () => {
  console.log("Connected to Redis");
});

redisClient.on("error", (err) => {
  console.log("Error connecting to Redis:", err);
});

redisClient.on("end", () => {
  console.log("Redis client disconnected");
});

// Automatically reconnect when a connection is lost
redisClient.on("reconnecting", (retry_time) => {
  console.log(`Reconnecting to Redis. Attempt: ${retry_time}`);
});
redisClient.connect();
export default function ({
  AuthRoutes,
  BillRoutes,
  BuildingRoutes,
  GuestRoutes,
  NotificationRoutes,
  ParkingSpotRoutes,
  UserRoutes,
  VehicleRoutes,
  WorkerRoutes,
  AddressRoutes,
  FileRoutes,
  PlanRoutes,
  PetRoutes,
  RecidentialUnitRoutes,
  PackageRoutes,
}) {
  const router = express.Router();
  const apiRoutesV2 = express.Router();

  const corsOptions = {
    origin: CORS_WHITELIST,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    allowedHeaders:
      "Content-Type,Authorization,encType,Access-Control-Allow-Origin,Access-Control-Allow-Headers,Origin,Accept,X-Requested-With,Access-Control-Request-Method,Access-Control-Request-Headers",
  };
  router.use(cookieParser());

  const isProd = PROJECT.mode === "production";
  const sessionConfig = {
    store: new RedisStore({ client: redisClient }),
    secret: JWT_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: isProd ? true : false, // set secure to false for development
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: "None",
      domain: isProd ? "vecino.pro" : "localhost",
    },
  };

  console.log("isProd", isProd, "sessionConfig", sessionConfig); //TODO: remove this line

  router.use(session(sessionConfig));

  router.use(passport.initialize());
  router.use(passport.session());

  router.use(ErrorMiddleware);
  apiRoutesV2
    .use(express.json())
    .use(express.urlencoded({ extended: false }))
    .use(cors(corsOptions))
    .use(helmet())
    .use(compression())
    .use(fileUpload());

  apiRoutesV2.use("/user", UserRoutes);
  apiRoutesV2.use("/auth", AuthRoutes);
  apiRoutesV2.use("/bill", BillRoutes);
  apiRoutesV2.use("/building", BuildingRoutes);
  apiRoutesV2.use("/guest", GuestRoutes);
  apiRoutesV2.use("/notification", NotificationRoutes);
  apiRoutesV2.use("/parkingspot", ParkingSpotRoutes);
  apiRoutesV2.use("/vehicle", VehicleRoutes);
  apiRoutesV2.use("/worker", WorkerRoutes);
  apiRoutesV2.use("/address", AddressRoutes);
  apiRoutesV2.use("/file", FileRoutes);
  apiRoutesV2.use("/plan", PlanRoutes);
  apiRoutesV2.use("/pet", PetRoutes);
  apiRoutesV2.use("/recidentialunit", RecidentialUnitRoutes);
  apiRoutesV2.use("/package", PackageRoutes);

  router.use("/v2/api", apiRoutesV2);
  router.use("/welcome", (req, res) => {
    res.status(200).json({
      message: "Welcome to the Vecino API",
      version: "v2",
      user: req.user,
    });
  });

  router.use(NotFoundMiddleware);

  router.use(apiRoutesV2);

  return router;
}
