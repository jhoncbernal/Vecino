const BaseService = require("./base.service");
let _worker = null;

class WorkerRepository extends BaseService {
  constructor({ Worker }) {
    super(Worker);
    _worker = Worker;
  }
}

module.exports = WorkerRepository;
