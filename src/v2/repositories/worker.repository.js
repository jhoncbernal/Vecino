import BaseRepository from "./base.repository.js";

class WorkerRepository extends BaseRepository {
  constructor({ Worker }) {
    super(Worker);
    this.model = Worker;
  }
}

export default WorkerRepository;
