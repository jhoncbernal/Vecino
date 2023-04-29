const BaseController = require('./base.controller');
class PlanController extends BaseController {
    constructor({ PlanService }) {
        super(PlanService);
        this.service = PlanService;
    }
}
module.exports = PlanController;