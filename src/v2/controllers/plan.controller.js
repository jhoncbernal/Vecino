import BaseController from "./base.controller.js";
class PlanController extends BaseController {
  constructor({ PlanService }) {
    super(PlanService);
    this.service = PlanService;
  }
}
export default PlanController;
