const { createContainer, asClass, asValue, asFunction } = require("awilix");
//config
const config = require("../config");
const app = require(".");
const database = require("../database/mongoose.database");

//services
const {
  UserService,
  AuthService,
  AdminService,
  ProviderService,
  VehicleService,
  ParkingSpaceService,
  FileService,
  ProductService,
  BillService,
  CityService,
} = require("../services");
//controllers
const {
  UserController,
  AuthController,
  AdminController,
  ProviderController,
  VehicleController,
  ParkingSpaceController,
  FileController,
  ProductController,
  BillController,
  CityController,
} = require("../controllers");
//routes
const {
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
} = require("../routes/index.routes");
const Routes = require("../routes");

//models
const {
  User,
  Admin,
  Provider,
  Vehicle,
  ParkingSpace,
  Positions,
  File,
  Product,
  Bill,
  City,
} = require("../models");
//repositories
const {
  UserRepository,
  AdminRepository,
  ProviderRepository,
  VehicleRepository,
  ParkingSpaceRepository,
  FileRepository,
  ProductRepository,
  BillRepository,
  CityRepository,
} = require("../repositories");

const container = createContainer();
container
  .register({
    app: asClass(app).singleton(),
    router: asClass(Routes).singleton(),
    config: asValue(config),
    database: asClass(database).singleton(),
  })
  .register({
    UserService: asClass(UserService).singleton(),
    AuthService: asClass(AuthService).singleton(),
    AdminService: asClass(AdminService).singleton(),
    ProviderService: asClass(ProviderService).singleton(),
    VehicleService: asClass(VehicleService).singleton(),
    ParkingSpaceService: asClass(ParkingSpaceService).singleton(),
    FileService: asClass(FileService).singleton(),
    ProductService: asClass(ProductService).singleton(),
    BillService: asClass(BillService).singleton(),
    CityService: asClass(CityService).singleton(),
  })
  .register({
    UserController: asClass(UserController.bind(UserController)).singleton(),
    AuthController: asClass(AuthController.bind(AuthController)).singleton(),
    AdminController: asClass(AdminController.bind(AdminController)).singleton(),
    ProviderController: asClass(
      ProviderController.bind(ProviderController)
    ).singleton(),
    VehicleController: asClass(
      VehicleController.bind(VehicleController)
    ).singleton(),
    ParkingSpaceController: asClass(
      ParkingSpaceController.bind(ParkingSpaceController)
    ).singleton(),
    FileController: asClass(FileController.bind(FileController)).singleton(),
    ProductController: asClass(
      ProductController.bind(ProductController)
    ).singleton(),
    BillController: asClass(BillController.bind(BillController)).singleton(),
    CityController: asClass(CityController).singleton(),
  })
  .register({
    UserRoutes: asFunction(UserRoutes).singleton(),
    AuthRoutes: asFunction(AuthRoutes).singleton(),
    AdminRoutes: asFunction(AdminRoutes).singleton(),
    ProviderRoutes: asFunction(ProviderRoutes).singleton(),
    VehicleRoutes: asFunction(VehicleRoutes).singleton(),
    ParkingSpaceRoutes: asFunction(ParkingSpaceRoutes).singleton(),
    PositionsRoutes: asFunction(PositionsRoutes).singleton(),
    FileRoutes: asFunction(FileRoutes).singleton(),
    ProductRoutes: asFunction(ProductRoutes).singleton(),
    BillRoutes: asFunction(BillRoutes).singleton(),
    CityRoutes: asFunction(CityRoutes).singleton(),
  })
  .register({
    User: asValue(User),
    Admin: asValue(Admin),
    Provider: asValue(Provider),
    Vehicle: asValue(Vehicle),
    ParkingSpace: asValue(ParkingSpace),
    Positions: asValue(Positions),
    File: asValue(File),
    Product: asValue(Product),
    Bill: asValue(Bill),
    City: asValue(City),
  })
  .register({
    UserRepository: asClass(UserRepository).singleton(),
    AdminRepository: asClass(AdminRepository).singleton(),
    ProviderRepository: asClass(ProviderRepository).singleton(),
    VehicleRepository: asClass(VehicleRepository).singleton(),
    ParkingSpaceRepository: asClass(ParkingSpaceRepository).singleton(),
    FileRepository: asClass(FileRepository).singleton(),
    ProductRepository: asClass(ProductRepository).singleton(),
    BillRepository: asClass(BillRepository).singleton(),
    CityRepository: asClass(CityRepository).singleton(),
  });

module.exports = container;
