import BaseController from "./base.controller.js";
class PlanController extends BaseController {
  constructor({ PlanService, logger }) {
    super(PlanService, logger);
    this.service = PlanService;
  }
}
export default PlanController;
