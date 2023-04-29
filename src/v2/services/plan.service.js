const BaseService = require('./base.service');
class PlanService extends BaseService {
    constructor({ PlanRepository }) {
        super(PlanRepository);
        this.repository = PlanRepository;
    }
}
module.exports = PlanService;