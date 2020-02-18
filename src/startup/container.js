const { createContainer, asClass, asValue, asFunction } = require('awilix');
//config
const config = require('../config');
const app = require('.')

//services
const { UserService,AuthService,NeighborhoodService} = require('../services');
//controllers
const { UserController,AuthController,NeighborhoodController } = require('../controllers');
//routes
const { UserRoutes,AuthRoutes,NeighborhoodRoutes} = require('../routes/index.routes');
const Routes = require('../routes');


//models
const {User,Neighborhood } = require('../models')
//repositories
const {UserRepository,NeighborhoodRepository } = require('../repositories')

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
    })
    .register({
        UserController: asClass(UserController.bind(UserController)).singleton(),
        AuthController: asClass(AuthController.bind(AuthController)).singleton(),
        NeighborhoodController: asClass(NeighborhoodController.bind(NeighborhoodController)).singleton()
    })
    .register({
        UserRoutes: asFunction(UserRoutes).singleton(),
        AuthRoutes: asFunction(AuthRoutes).singleton(),
        NeighborhoodRoutes: asFunction(NeighborhoodRoutes).singleton(),
    }).register({
        User: asValue(User),
        Neighborhood: asValue(Neighborhood),
    }).register({
        UserRepository: asClass(UserRepository).singleton(),
        NeighborhoodRepository: asClass(NeighborhoodRepository).singleton(),

    });

module.exports = container;