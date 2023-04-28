const BaseRepository = require("./base.repository");

class VehicleRepository extends BaseRepository {
  constructor({ Vehicle }) {
    super(Vehicle);
    this.repository = Vehicle;
  }
}

module.exports = VehicleRepository;
