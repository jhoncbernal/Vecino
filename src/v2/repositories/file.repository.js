const BaseRepository = require("./base.repository");

class FileRepository extends BaseRepository {
  constructor({ File }) {
    super(File);
    this.repository = File;
  }
}

module.exports = FileRepository;