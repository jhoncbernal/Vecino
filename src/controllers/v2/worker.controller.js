const BaseController = require("./base.controller");
let _workerService = null;

class WorkerController extends BaseController {
  constructor({ WorkerService }) {
    super(WorkerService);
    _workerService = WorkerService;
  }
}

module.exports = WorkerController;
