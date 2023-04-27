const BaseController = require("./base.controller");
let _vehicleService = null;

class VehicleController extends BaseController {
  constructor({ VehicleService }) {
    super(VehicleService);
    _vehicleService = VehicleService;
  }
}

module.exports = VehicleController;
