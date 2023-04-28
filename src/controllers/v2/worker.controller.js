const bindMethods = require("../../utils/bindMethods");
const BaseController = require("./base.controller");

class WorkerController extends BaseController {
  constructor({ WorkerService }) {
    super(WorkerService);
    this.service = WorkerService;
    bindMethods(this);
  }
}

module.exports = WorkerController;
