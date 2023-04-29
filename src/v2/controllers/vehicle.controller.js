const bindMethods = require("../../utils/bindMethods");
const BaseController = require("./base.controller");

class VehicleController extends BaseController {
  constructor({ VehicleService }) {
    super(VehicleService);
    this.service = VehicleService;
    bindMethods(this);
  }
}

module.exports = VehicleController;
