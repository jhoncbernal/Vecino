import bindMethods from "../../utils/bindMethods.js";
import BaseController from "./base.controller.js";

class WorkerController extends BaseController {
  constructor({ WorkerService, logger }) {
    super(WorkerService, logger);
    this.service = WorkerService;
    bindMethods(this);
  }
}

export default WorkerController;
