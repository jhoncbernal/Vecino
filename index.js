const container = require("./src/startup/v2/container");
const server = container.resolve("app");
container.resolve("config");
const database = container.resolve("database");
database
  .connect()
  .then(() => server.start())
  .catch(console.log);
