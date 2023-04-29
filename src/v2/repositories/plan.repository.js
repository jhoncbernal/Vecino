const BaseRepository = require('./base.repository');
class PlanRepository extends BaseRepository {
    constructor({ Plan }) {
        super(Plan);
        this.model = Plan;
    }
}
module.exports = PlanRepository;