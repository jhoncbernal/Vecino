import BaseRepository from "./base.repository.js";

class ParkingSpotRepository extends BaseRepository {
  constructor({ ParkingSpot }) {
    super(ParkingSpot);
    this.model = ParkingSpot;
  }
}

export default ParkingSpotRepository;
