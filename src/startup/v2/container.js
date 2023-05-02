import { createContainer, asClass, asValue, asFunction } from "awilix";
//config
import * as config from "../../config/index.js";
import app from "../index.js";
import database from "../../database/mongoose.database.js";

//services
import {
  AuthService,
  BillService,
  BuildingService,
  GuestService,
  NotificationService,
  ParkingSpotService,
  UserService,
  VehicleService,
  WorkerService,
  AddressService,
  FileService,
  PlanService,
} from "../../v2/services/index.js";
//controllers
import {
  AuthController,
  BillController,
  BuildingController,
  GuestController,
  NotificationController,
  ParkingSpotController,
  UserController,
  VehicleController,
  WorkerController,
  AddressController,
  FileController,
  PlanController,
} from "../../v2/controllers/index.js";
//routes
import { AuthRoutes, BillRoutes, BuildingRoutes, GuestRoutes, NotificationRoutes, ParkingSpotRoutes, UserRoutes, VehicleRoutes, WorkerRoutes, AddressRoutes, FileRoutes, PlanRoutes } from "../../v2/routes/index.routes.js";
import Routes from "../../v2/routes/index.js";
//models
import {
  Auth,
  Bill,
  Building,
  Guest,
  Notification,
  ParkingSpot,
  User,
  Vehicle,
  Worker,
  Address,
  File,
  Plan,
} from "../../v2/models/index.js";
//repositories
import {
  AuthRepository,
  BillRepository,
  BuildingRepository,
  GuestRepository,
  NotificationRepository,
  ParkingSpotRepository,
  UserRepository,
  VehicleRepository,
  WorkerRepository,
  AddressRepository,
  FileRepository,
  PlanRepository,
} from "../../v2/repositories/index.js";
//const container = require("../container");

const container = createContainer();
container
  .register({
    app: asClass(app).singleton(),
    router: asClass(Routes).singleton(),
    config: asValue(config),
    database: asClass(database).singleton(),
  })
  .register({
    AuthService: asClass(AuthService).singleton(),
    BillService: asClass(BillService).singleton(),
    BuildingService: asClass(BuildingService).singleton(),
    GuestService: asClass(GuestService).singleton(),
    NotificationService: asClass(NotificationService).singleton(),
    ParkingSpotService: asClass(ParkingSpotService).singleton(),
    UserService: asClass(UserService).singleton(),
    VehicleService: asClass(VehicleService).singleton(),
    WorkerService: asClass(WorkerService).singleton(),
    AddressService: asClass(AddressService).singleton(),
    FileService: asClass(FileService).singleton(),
    PlanService: asClass(PlanService).singleton(),
  })
  .register({
    AuthController: asClass(AuthController.bind(AuthController)).singleton(),
    BillController: asClass(BillController.bind(BillController)).singleton(),
    BuildingController: asClass(
      BuildingController.bind(BuildingController)
    ).singleton(),
    GuestController: asClass(GuestController.bind(GuestController)).singleton(),
    NotificationController: asClass(
      NotificationController.bind(NotificationController)
    ).singleton(),
    ParkingSpotController: asClass(
      ParkingSpotController.bind(ParkingSpotController)
    ).singleton(),
    UserController: asClass(UserController.bind(UserController)).singleton(),
    VehicleController: asClass(
      VehicleController.bind(VehicleController)
    ).singleton(),
    WorkerController: asClass(
      WorkerController.bind(WorkerController)
    ).singleton(),
    AddressController: asClass(
      AddressController.bind(AddressController)
    ).singleton(),
    FileController: asClass(FileController.bind(FileController)).singleton(),
    PlanController: asClass(PlanController.bind(PlanController)).singleton(),
  })
  .register({
    AuthRoutes: asFunction(AuthRoutes).singleton(),
    BillRoutes: asFunction(BillRoutes).singleton(),
    BuildingRoutes: asFunction(BuildingRoutes).singleton(),
    GuestRoutes: asFunction(GuestRoutes).singleton(),
    NotificationRoutes: asFunction(NotificationRoutes).singleton(),
    ParkingSpotRoutes: asFunction(ParkingSpotRoutes).singleton(),
    UserRoutes: asFunction(UserRoutes).singleton(),
    VehicleRoutes: asFunction(VehicleRoutes).singleton(),
    WorkerRoutes: asFunction(WorkerRoutes).singleton(),
    AddressRoutes: asFunction(AddressRoutes).singleton(),
    FileRoutes: asFunction(FileRoutes).singleton(),
    PlanRoutes: asFunction(PlanRoutes).singleton(),
  })
  .register({
    Auth: asValue(Auth),
    Bill: asValue(Bill),
    Building: asValue(Building),
    Guest: asValue(Guest),
    Notification: asValue(Notification),
    ParkingSpot: asValue(ParkingSpot),
    User: asValue(User),
    Vehicle: asValue(Vehicle),
    Worker: asValue(Worker),
    Address: asValue(Address),
    File: asValue(File),
    Plan: asValue(Plan),
  })
  .register({
    AuthRepository: asClass(AuthRepository).singleton(),
    BillRepository: asClass(BillRepository).singleton(),
    BuildingRepository: asClass(BuildingRepository).singleton(),
    GuestRepository: asClass(GuestRepository).singleton(),
    NotificationRepository: asClass(NotificationRepository).singleton(),
    ParkingSpotRepository: asClass(ParkingSpotRepository).singleton(),
    UserRepository: asClass(UserRepository).singleton(),
    VehicleRepository: asClass(VehicleRepository).singleton(),
    WorkerRepository: asClass(WorkerRepository).singleton(),
    AddressRepository: asClass(AddressRepository).singleton(),
    FileRepository: asClass(FileRepository).singleton(),
    PlanRepository: asClass(PlanRepository).singleton(),
  });

export default container;
