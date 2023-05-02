import BaseRepository from "./base.repository.js";
class PlanRepository extends BaseRepository {
  constructor({ Plan }) {
    super(Plan);
    this.model = Plan;
  }
}
export default PlanRepository;
