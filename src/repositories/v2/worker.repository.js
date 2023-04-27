const BaseRepository = require("./base.repository");
let _worker = null;

class WorkerRepository extends BaseRepository {
  constructor({ Worker }) {
    super(Worker);
    _worker = Worker;
  }
}

module.exports = WorkerRepository;
