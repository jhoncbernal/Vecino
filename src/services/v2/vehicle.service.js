const BaseService = require("./base.service");
let _vehicle = null;

class VehicleRepository extends BaseService {
  constructor({ Vehicle }) {
    super(Vehicle);
    _vehicle = Vehicle;
  }
}

module.exports = VehicleRepository;
