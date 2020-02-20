const { createContainer, asClass, asValue, asFunction } = require('awilix');
//config
const config = require('../config');
const app = require('.')

//services
const { UserService,AuthService,NeighborhoodService,VehicleService,ParkingSpaceService} = require('../services');
//controllers
const { UserController,AuthController,NeighborhoodController,VehicleController,ParkingSpaceController } = require('../controllers');
//routes
const { UserRoutes,AuthRoutes,NeighborhoodRoutes,VehicleRoutes,ParkingSpaceRoutes} = require('../routes/index.routes');
const Routes = require('../routes');


//models
const {User,Neighborhood,Vehicle,ParkingSpace } = require('../models')
//repositories
const {UserRepository,NeighborhoodRepository,VehicleRepository,ParkingSpaceRepository } = require('../repositories')

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
    })
    .register({
        UserController: asClass(UserController.bind(UserController)).singleton(),
        AuthController: asClass(AuthController.bind(AuthController)).singleton(),
        NeighborhoodController: asClass(NeighborhoodController.bind(NeighborhoodController)).singleton(),
        VehicleController: asClass(VehicleController.bind(VehicleController)).singleton(),
        ParkingSpaceController: asClass(ParkingSpaceController.bind(ParkingSpaceController)).singleton()
    })
    .register({
        UserRoutes: asFunction(UserRoutes).singleton(),
        AuthRoutes: asFunction(AuthRoutes).singleton(),
        NeighborhoodRoutes: asFunction(NeighborhoodRoutes).singleton(),
        VehicleRoutes: asFunction(VehicleRoutes).singleton(),
        ParkingSpaceRoutes: asFunction(ParkingSpaceRoutes).singleton(),
    }).register({
        User: asValue(User),
        Neighborhood: asValue(Neighborhood),
        Vehicle: asValue(Vehicle),
        ParkingSpace: asValue(ParkingSpace),
    }).register({
        UserRepository: asClass(UserRepository).singleton(),
        NeighborhoodRepository: asClass(NeighborhoodRepository).singleton(),
        VehicleRepository: asClass(VehicleRepository).singleton(),
        ParkingSpaceRepository: asClass(ParkingSpaceRepository).singleton(),

    });

module.exports = container;