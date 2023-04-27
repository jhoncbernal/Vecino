const BaseController = require("./base.controller");
let _parkingSpotService = null;

class ParkingSpotController extends BaseController {
  constructor({ ParkingSpotService }) {
    super(ParkingSpotService);
    _parkingSpotService = ParkingSpotService;
  }
}

module.exports = ParkingSpotController;
