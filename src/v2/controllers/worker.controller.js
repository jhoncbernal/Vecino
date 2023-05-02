import bindMethods from "../../utils/bindMethods.js";
import BaseController from "./base.controller.js";

class WorkerController extends BaseController {
  constructor({ WorkerService }) {
    super(WorkerService);
    this.service = WorkerService;
    bindMethods(this);
  }
}

export default WorkerController;
