import BaseRepository from "./base.repository.js";

class WorkerRepository extends BaseRepository {
  constructor({ Worker }) {
    super(Worker);
    this.repository = Worker;
  }
}

export default WorkerRepository;
