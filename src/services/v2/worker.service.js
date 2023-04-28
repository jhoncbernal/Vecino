const BaseService = require("./base.service");
class WorkerRepository extends BaseService {
  constructor({ WorkerRepository }) {
    super(WorkerRepository);
    this.repository = WorkerRepository;
  }
}

module.exports = WorkerRepository;
