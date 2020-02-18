const { createContainer, asClass, asValue, asFunction } = require('awilix');
//config
const config = require('../config');
const app = require('.')

//services
const { UserService,AuthService} = require('../services');
//controllers
const { UserController,AuthController } = require('../controllers');
//routes
const { UserRoutes,AuthRoutes} = require('../routes/index.routes');
const Routes = require('../routes');


//models
const {User } = require('../models')
//repositories
const {UserRepository } = require('../repositories')

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
    })
    .register({
        UserController: asClass(UserController.bind(UserController)).singleton(),
        AuthController: asClass(AuthController.bind(AuthController)).singleton()
    })
    .register({
        UserRoutes: asFunction(UserRoutes).singleton(),
        AuthRoutes: asFunction(AuthRoutes).singleton(),
    }).register({
        User: asValue(User),
    }).register({
        UserRepository: asClass(UserRepository).singleton(),
    });

module.exports = container;