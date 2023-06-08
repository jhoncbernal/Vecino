import BaseRepository from "./base.repository.js";

class VehicleRepository extends BaseRepository {
  constructor({ Vehicle, eventBus }) {
    super(Vehicle, eventBus);
    this.model = Vehicle;
  }
}

export default VehicleRepository;
