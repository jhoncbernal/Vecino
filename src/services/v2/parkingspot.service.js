const BaseService = require("./base.service");
class ParkingSpotRepository extends BaseService {
  constructor({ ParkingSpotRepository }) {
    super(ParkingSpotRepository);
    this.repository = ParkingSpotRepository;
  }
}

module.exports = ParkingSpotRepository;
