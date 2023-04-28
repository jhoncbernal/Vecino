const BaseService = require("./base.service");
class VehicleRepository extends BaseService {
  constructor({ VehicleRepository }) {
    super(VehicleRepository);
    this.repository = VehicleRepository;
  }
}

module.exports = VehicleRepository;
