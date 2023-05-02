import BaseService from "./base.service.js";
class WorkerService extends BaseService {
  constructor({ WorkerRepository }) {
    super(WorkerRepository);
    this.repository = WorkerRepository;
  }
}

export default WorkerService;
