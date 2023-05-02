import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import { ErrorMiddleware, NotFoundMiddleware } from "../../middlewares/index.js";
import session from "express-session";
import passport from "../../utils/passport-setup.js";
import { JWT_SECRET } from "../../config/index.js";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";

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
}) {
  const router = express.Router();
  const apiRoutesV2 = express.Router();

  const corsOptions = {
    origin: ["https://vecinoo.herokuapp.com", "http://localhost:5173"],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders:
      "Content-Type,Authorization,encType,Access-Control-Allow-Origin,Access-Control-Allow-Headers,Origin,Accept,X-Requested-With,Access-Control-Request-Method,Access-Control-Request-Headers",
  };

  router.use(cookieParser());
  router.use(
    session({
      secret: JWT_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 1800000,
      },
    })
  );

  router.use(passport.initialize());
  router.use(passport.session());

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

  router.use("/v2/api", apiRoutesV2);
  router.use("/", (req, res) => {
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
}
