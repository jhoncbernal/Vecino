const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
require("express-async-errors");
const { ErrorMiddleware, NotFoundMiddleware } = require("../middlewares");
//fileupload
var fileUpload = require("express-fileupload");

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
    origin: ["corsOptions", "http://localhost:3000"], // Replace with your Heroku app URL and any other origins you want to allow
    methods: "GET,PUT,PATCH,POST,DELETE", // Allowed methods
    allowedHeaders: "Content-Type,Authorization", // Allowed headers
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

  return router;
};
