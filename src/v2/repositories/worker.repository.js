const BaseRepository = require("./base.repository");

class WorkerRepository extends BaseRepository {
  constructor({ Worker }) {
    super(Worker);
    this.repository = Worker;
  }
}

module.exports = WorkerRepository;
