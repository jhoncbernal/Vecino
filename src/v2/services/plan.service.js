import BaseService from "./base.service.js";
class PlanService extends BaseService {
  constructor({ PlanRepository }) {
    super(PlanRepository);
    this.repository = PlanRepository;
  }
}
export default PlanService;
