const BaseRepository = require("./base.repository");
let _vehicle = null;

class VehicleRepository extends BaseRepository {
  constructor({ Vehicle }) {
    super(Vehicle);
    _vehicle = Vehicle;
  }
}

module.exports = VehicleRepository;
