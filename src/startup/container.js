const { createContainer, asClass, asValue, asFunction } = require('awilix');
//config
const config = require('../config');
const app = require('.')

//services
const { UserService,AuthService,NeighborhoodService,VehicleService,ParkingSpaceService,FileService} = require('../services');
//controllers
const { UserController,AuthController,NeighborhoodController,VehicleController,ParkingSpaceController,FileController } = require('../controllers');
//routes
const { UserRoutes,AuthRoutes,NeighborhoodRoutes,VehicleRoutes,ParkingSpaceRoutes,PositionsRoutes,FileRoutes} = require('../routes/index.routes');
const Routes = require('../routes');


//models
const {User,Neighborhood,Vehicle,ParkingSpace,Positions,File} = require('../models')
//repositories
const {UserRepository,NeighborhoodRepository,VehicleRepository,ParkingSpaceRepository,FileRepository} = require('../repositories')

const container = createContainer();
container
    .register({
        app:    asClass(app).singleton(),
        router: asClass(Routes).singleton(),
        config: asValue(config)
    })
    .register({
        UserService: asClass(UserService).singleton(),
        AuthService: asClass(AuthService).singleton(),
        NeighborhoodService: asClass(NeighborhoodService).singleton(),
        VehicleService: asClass(VehicleService).singleton(),
        ParkingSpaceService: asClass(ParkingSpaceService).singleton(),
        FileService: asClass(FileService).singleton(),
    })
    .register({
        UserController: asClass(UserController.bind(UserController)).singleton(),
        AuthController: asClass(AuthController.bind(AuthController)).singleton(),
        NeighborhoodController: asClass(NeighborhoodController.bind(NeighborhoodController)).singleton(),
        VehicleController: asClass(VehicleController.bind(VehicleController)).singleton(),
        ParkingSpaceController: asClass(ParkingSpaceController.bind(ParkingSpaceController)).singleton(),
        FileController: asClass(FileController.bind(FileController)).singleton()
    })
    .register({
        UserRoutes: asFunction(UserRoutes).singleton(),
        AuthRoutes: asFunction(AuthRoutes).singleton(),
        NeighborhoodRoutes: asFunction(NeighborhoodRoutes).singleton(),
        VehicleRoutes: asFunction(VehicleRoutes).singleton(),
        ParkingSpaceRoutes: asFunction(ParkingSpaceRoutes).singleton(),
        PositionsRoutes: asFunction(PositionsRoutes).singleton(),
        FileRoutes:asFunction(FileRoutes).singleton(),
    }).register({
        User: asValue(User),
        Neighborhood: asValue(Neighborhood),
        Vehicle: asValue(Vehicle),
        ParkingSpace: asValue(ParkingSpace),
        Positions: asValue(Positions),
        File: asValue(File),
    }).register({
        UserRepository: asClass(UserRepository).singleton(),
        NeighborhoodRepository: asClass(NeighborhoodRepository).singleton(),
        VehicleRepository: asClass(VehicleRepository).singleton(),
        ParkingSpaceRepository: asClass(ParkingSpaceRepository).singleton(),
        FileRepository: asClass(FileRepository).singleton(),

    });

module.exports = container;