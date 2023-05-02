import BaseRepository from "./base.repository.js";

class ParkingSpotRepository extends BaseRepository {
  constructor({ ParkingSpot }) {
    super(ParkingSpot);
    this.repository = ParkingSpot;
  }
}

export default ParkingSpotRepository;
