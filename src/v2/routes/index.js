const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const { ErrorMiddleware, NotFoundMiddleware } = require("../../middlewares");

// Import session and passport modules
const session = require("express-session");
const passport = require("../../utils/passport-setup");

// Import configuration file for JWT_SECRET
const { JWT_SECRET } = require("../../config");

// Import cookie-parser and file-upload middleware
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");

module.exports = function ({
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
  FileRoutes
}) {
  const router = express.Router();
  const apiRoutesV2 = express.Router();

  // CORS configuration
  const corsOptions = {
    origin: ["https://vecinoo.herokuapp.com", "http://localhost:5173"], // allowed origins
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders:
      "Content-Type,Authorization,encType,Access-Control-Allow-Origin,Access-Control-Allow-Headers,Origin,Accept,X-Requested-With,Access-Control-Request-Method,Access-Control-Request-Headers",
  };

  // Use middleware
  router.use(cookieParser());

  // Initialize session middleware
  router.use(
    session({
      secret: JWT_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 1800000, // 30 minutes
      },
    })
  );

  // Initialize Passport.js middleware
  router.use(passport.initialize());
  router.use(passport.session());

  // Use remaining middleware
  apiRoutesV2
    .use(express.json())
    .use(express.urlencoded({ extended: false }))
    .use(cors(corsOptions))
    .use(helmet())
    .use(compression())
    .use(fileUpload());

  // Use routes
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
  // Use routes and middleware in router
  router.use("/v2/api", apiRoutesV2);
  router.use('/', (req, res) => {
    res.status(200).json({
      message: "Welcome to the Vecino API",
      version: "v2",
      user: req.user,
    });
  });

  router.use(NotFoundMiddleware);
  router.use(ErrorMiddleware);
  router.use(apiRoutesV2);

  return router;
};
