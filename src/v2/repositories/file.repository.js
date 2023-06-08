import BaseRepository from "./base.repository.js";

class FileRepository extends BaseRepository {
  constructor({ File, eventBus }) {
    super(File, eventBus);
    this.model = File;
  }
}

export default FileRepository;