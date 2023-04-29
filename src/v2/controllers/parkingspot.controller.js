const bindMethods = require("../../utils/bindMethods");
const BaseController = require("./base.controller");

class ParkingSpotController extends BaseController {
  constructor({ ParkingSpotService }) {
    super(ParkingSpotService);
    this.service = ParkingSpotService;
    bindMethods(this);
  }
}

module.exports = ParkingSpotController;
