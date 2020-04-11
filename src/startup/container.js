const { createContainer, asClass, asValue, asFunction } = require('awilix');
//config
const config = require('../config');
const app = require('.')

//services
const { UserService, AuthService, AdminService, VehicleService, ParkingSpaceService, FileService } = require('../services');
//controllers
const { UserController, AuthController, AdminController, VehicleController, ParkingSpaceController, FileController } = require('../controllers');
//routes
const { UserRoutes, AuthRoutes, AdminRoutes, VehicleRoutes, ParkingSpaceRoutes, PositionsRoutes, FileRoutes } = require('../routes/index.routes');
const Routes = require('../routes');


//models
const { User, Admin, Vehicle, ParkingSpace, Positions, File } = require('../models')
//repositories
const { UserRepository, AdminRepository, VehicleRepository, ParkingSpaceRepository, FileRepository } = require('../repositories')

const container = createContainer();
container
    .register({
        app: asClass(app).singleton(),
        router: asClass(Routes).singleton(),
        config: asValue(config)
    })
    .register({
        UserService: asClass(UserService).singleton(),
        AuthService: asClass(AuthService).singleton(),
        AdminService: asClass(AdminService).singleton(),
        VehicleService: asClass(VehicleService).singleton(),
        ParkingSpaceService: asClass(ParkingSpaceService).singleton(),
        FileService: asClass(FileService).singleton(),
    })
    .register({
        UserController: asClass(UserController.bind(UserController)).singleton(),
        AuthController: asClass(AuthController.bind(AuthController)).singleton(),
        AdminController: asClass(AdminController.bind(AdminController)).singleton(),
        VehicleController: asClass(VehicleController.bind(VehicleController)).singleton(),
        ParkingSpaceController: asClass(ParkingSpaceController.bind(ParkingSpaceController)).singleton(),
        FileController: asClass(FileController.bind(FileController)).singleton()
    })
    .register({
        UserRoutes: asFunction(UserRoutes).singleton(),
        AuthRoutes: asFunction(AuthRoutes).singleton(),
        AdminRoutes: asFunction(AdminRoutes).singleton(),
        VehicleRoutes: asFunction(VehicleRoutes).singleton(),
        ParkingSpaceRoutes: asFunction(ParkingSpaceRoutes).singleton(),
        PositionsRoutes: asFunction(PositionsRoutes).singleton(),
        FileRoutes: asFunction(FileRoutes).singleton(),
    }).register({
        User: asValue(User),
        Admin: asValue(Admin),
        Vehicle: asValue(Vehicle),
        ParkingSpace: asValue(ParkingSpace),
        Positions: asValue(Positions),
        File: asValue(File),
    }).register({
        UserRepository: asClass(UserRepository).singleton(),
        AdminRepository: asClass(AdminRepository).singleton(),
        VehicleRepository: asClass(VehicleRepository).singleton(),
        ParkingSpaceRepository: asClass(ParkingSpaceRepository).singleton(),
        FileRepository: asClass(FileRepository).singleton(),

    });

module.exports = container;