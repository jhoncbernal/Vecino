import BaseRepository from "./base.repository.js";

class FileRepository extends BaseRepository {
  constructor({ File }) {
    super(File);
    this.model = File;
  }
}

export default FileRepository;