const BaseRepository = require("./base.repository");

class ParkingSpotRepository extends BaseRepository {
  constructor({ ParkingSpot }) {
    super(ParkingSpot);
    this.repository = ParkingSpot;
  }
}

module.exports = ParkingSpotRepository;
