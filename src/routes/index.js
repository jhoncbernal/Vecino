const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
require("express-async-errors");
const { ErrorMiddleware, NotFoundMiddleware } = require("../middlewares");
//fileupload
var fileUpload = require("express-fileupload");
const apiRoutesV2 = require("./v2");

module.exports = function ({
  UserRoutes,
  AuthRoutes,
  AdminRoutes,
  ProviderRoutes,
  VehicleRoutes,
  ParkingSpaceRoutes,
  PositionsRoutes,
  FileRoutes,
  ProductRoutes,
  BillRoutes,
  CityRoutes,
  PackageRoutes,
}) {
  const router = express.Router();
  const apiRoutes = express.Router();
  // CORS configuration
const corsOptions = {
  origin: ["https://vecinoo.herokuapp.com", "http://localhost:5173"], // allowed origins
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders:
    "Content-Type,Authorization,encType,Access-Control-Allow-Origin,Access-Control-Allow-Headers,Origin,Accept,X-Requested-With,Access-Control-Request-Method,Access-Control-Request-Headers",
};
  apiRoutes
    .use(express.json())
    .use(express.urlencoded({ extended: true }))
    .use(cors(corsOptions))
    .use(helmet())
    .use(compression())
    .use(fileUpload());

  apiRoutes.use("/user", UserRoutes);
  apiRoutes.use("/auth", AuthRoutes);
  apiRoutes.use("/admin", AdminRoutes);
  apiRoutes.use("/provider", ProviderRoutes);
  apiRoutes.use("/vehicle", VehicleRoutes);
  apiRoutes.use("/parkingspace", ParkingSpaceRoutes);
  apiRoutes.use("/parkingspace/positions", PositionsRoutes);
  apiRoutes.use("/file", FileRoutes);
  apiRoutes.use("/product", ProductRoutes);
  apiRoutes.use("/bill", BillRoutes);
  apiRoutes.use("/city", CityRoutes);
  apiRoutes.use("/package", PackageRoutes);

  router.use("/v1/api", apiRoutes);
  router.use(NotFoundMiddleware);
  router.use(ErrorMiddleware);
  //router.use(apiRoutesV2);

  return router;
};
