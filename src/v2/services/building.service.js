import BaseService from "./base.service.js";
class BuildingService extends BaseService {
  constructor({ BuildingRepository }) {
    super(BuildingRepository);
    this.repository = BuildingRepository;
  }
}

export default BuildingService;
