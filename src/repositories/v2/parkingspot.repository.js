const BaseRepository = require("./base.repository");
let _parkingSpot = null;

class ParkingSpotRepository extends BaseRepository {
  constructor({ ParkingSpot }) {
    super(ParkingSpot);
    _parkingSpot = ParkingSpot;
  }
}

module.exports = ParkingSpotRepository;
