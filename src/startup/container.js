const { createContainer, asClass, asValue, asFunction } = require('awilix');
//config
const config = require('../config');
const app = require('.')

//services
const { UserService,AuthService,NeighborhoodService,VehicleService} = require('../services');
//controllers
const { UserController,AuthController,NeighborhoodController,VehicleController } = require('../controllers');
//routes
const { UserRoutes,AuthRoutes,NeighborhoodRoutes,VehicleRoutes} = require('../routes/index.routes');
const Routes = require('../routes');


//models
const {User,Neighborhood,Vehicle } = require('../models')
//repositories
const {UserRepository,NeighborhoodRepository,VehicleRepository } = require('../repositories')

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
    })
    .register({
        UserController: asClass(UserController.bind(UserController)).singleton(),
        AuthController: asClass(AuthController.bind(AuthController)).singleton(),
        NeighborhoodController: asClass(NeighborhoodController.bind(NeighborhoodController)).singleton(),
        VehicleController: asClass(VehicleController.bind(VehicleController)).singleton()
    })
    .register({
        UserRoutes: asFunction(UserRoutes).singleton(),
        AuthRoutes: asFunction(AuthRoutes).singleton(),
        NeighborhoodRoutes: asFunction(NeighborhoodRoutes).singleton(),
        VehicleRoutes: asFunction(VehicleRoutes).singleton(),
    }).register({
        User: asValue(User),
        Neighborhood: asValue(Neighborhood),
        Vehicle: asValue(Vehicle),
    }).register({
        UserRepository: asClass(UserRepository).singleton(),
        NeighborhoodRepository: asClass(NeighborhoodRepository).singleton(),
        VehicleRepository: asClass(VehicleRepository).singleton(),

    });

module.exports = container;