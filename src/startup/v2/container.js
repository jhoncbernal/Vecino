const { createContainer, asClass, asValue, asFunction } = require("awilix");
//config
const config = require("../../config");
const app = require("../index");
const database = require("../../database/mongoose.database");

//services
const {
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
  FileService
} = require("../../v2/services");
//controllers
const {
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
  FileController
} = require("../../v2/controllers");
//routes
const {
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
} = require("../../v2/routes/index.routes");
const Routes = require("../../v2/routes");

//models
const {
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
  File
} = require("../../v2/models");
//repositories
const {
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
  FileRepository
} = require("../../v2/repositories");
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
  });

module.exports = container;
