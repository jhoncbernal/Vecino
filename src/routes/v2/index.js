const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
require("express-async-errors");
const { ErrorMiddleware, NotFoundMiddleware } = require("../../middlewares");
//fileupload
var fileUpload = require("express-fileupload");

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
  apiRoutesV2
    .use(express.json())
    .use(express.urlencoded({ extended: true }))
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

  router.use("/v2/api", apiRoutesV2);

  router.use(NotFoundMiddleware);
  router.use(ErrorMiddleware);
  router.use(apiRoutesV2);

  return router;
};
