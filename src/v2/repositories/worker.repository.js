import BaseRepository from "./base.repository.js";

class WorkerRepository extends BaseRepository {
  constructor({ Worker, eventBus }) {
    super(Worker, eventBus);
    this.model = Worker;
  }
}

export default WorkerRepository;
