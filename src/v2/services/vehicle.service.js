import BaseService from "./base.service.js";
class VehicleService extends BaseService {
  constructor({ VehicleRepository }) {
    super(VehicleRepository);
    this.repository = VehicleRepository;
  }
}

export default VehicleService;
