import BaseService from "./base.service.js";
class ParkingSpotService extends BaseService {
  constructor({ ParkingSpotRepository }) {
    super(ParkingSpotRepository);
    this.repository = ParkingSpotRepository;
  }
}

export default ParkingSpotService;
