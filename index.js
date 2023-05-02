import container from "./src/startup/v2/container.js";
const server = container.resolve("app");
container.resolve("config");
const database = container.resolve("database");

(async () => {
  try {
    await database.connect();
    server.start();
  } catch (error) {
    console.error(error);
  }
})();
