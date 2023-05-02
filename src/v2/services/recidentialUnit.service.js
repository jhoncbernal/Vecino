import BaseService from "./base.service.js";
class RecidentialUnitService extends BaseService {
  constructor({ RecidentialUnitRepository }) {
    super(RecidentialUnitRepository);
    this.repository = RecidentialUnitRepository;
  }
}

export default RecidentialUnitService;
