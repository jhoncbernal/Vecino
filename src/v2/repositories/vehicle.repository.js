import BaseRepository from "./base.repository.js";

class VehicleRepository extends BaseRepository {
  constructor({ Vehicle }) {
    super(Vehicle);
    this.model = Vehicle;
  }
}

export default VehicleRepository;
