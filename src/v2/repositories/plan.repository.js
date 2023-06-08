import BaseRepository from "./base.repository.js";
class PlanRepository extends BaseRepository {
  constructor({ Plan, eventBus }) {
    super(Plan, eventBus);
    this.model = Plan;
  }
}
export default PlanRepository;
