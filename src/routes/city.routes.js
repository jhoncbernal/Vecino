const { Router } = require("express");

module.exports = function ({ CityController }) {
    const router = Router();
    router.get("", CityController.getAll);
    router.get("/:cityId", CityController.get);
    router.post("", CityController.create);
    router.patch("/:cityId", CityController.update);
    router.delete("/:cityId", CityController.delete);
    router.get("/name/:name", CityController.getCityByName);
    router.get("/code/:code", CityController.getCityByCode);
    router.get("/state/name/:name", CityController.getCitiesByStateName);
    router.get("/state/code/:code", CityController.getCitiesByStateCode);
    return router;
}