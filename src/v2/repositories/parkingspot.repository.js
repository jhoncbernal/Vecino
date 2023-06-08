import BaseRepository from "./base.repository.js";

class ParkingSpotRepository extends BaseRepository {
  constructor({ ParkingSpot, eventBus }) {
    super(ParkingSpot, eventBus);
    this.model = ParkingSpot;
  }
}

export default ParkingSpotRepository;
