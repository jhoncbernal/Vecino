import { createContainer, asClass, asValue, asFunction } from "awilix";
//config
import * as config from "../../config/index.js";
import app from "../index.js";
import database from "../../database/mongoose.database.js";

//services
import * as Services from "../../v2/services/index.js";
//controllers
import * as Controllers from "../../v2/controllers/index.js";
//routes
import * as Routes from "../../v2/routes/index.routes.js";
//router
import Router from "../../v2/routes/index.js";
//models
import * as Models from "../../v2/models/index.js";
//repositories
import * as Repositories from "../../v2/repositories/index.js";

const container = createContainer();
container.register({
  app: asClass(app).singleton(),
  router: asClass(Router).singleton(),
  config: asValue(config),
  database: asClass(database).singleton(),
});

// Register all services as classes
Object.entries(Services).forEach(([name, Service]) => {
  container.register({
    [name]: asClass(Service).singleton(),
  });
});

// Register all controllers as classes with bound methods
Object.entries(Controllers).forEach(([name, Controller]) => {
  container.register({
    [name]: asClass(Controller.bind(Controller)).singleton(),
  });
});

// Register all routes as functions
Object.entries(Routes).forEach(([name, Route]) => {
  container.register({
    [name]: asFunction(Route).singleton(),
  });
});

// Register all repositories as classes
Object.entries(Repositories).forEach(([name, Repository]) => {
  container.register({
    [name]: asClass(Repository).singleton(),
  });
});

// Register all models as values
Object.entries(Models).forEach(([name, Model]) => {
  container.register({
    [name]: asValue(Model),
  });
});


export default container;