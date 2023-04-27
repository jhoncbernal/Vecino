const BaseService = require("./base.service");
let _parkingSpot = null;

class ParkingSpotRepository extends BaseService {
  constructor({ ParkingSpot }) {
    super(ParkingSpot);
    _parkingSpot = ParkingSpot;
  }
}

module.exports = ParkingSpotRepository;
