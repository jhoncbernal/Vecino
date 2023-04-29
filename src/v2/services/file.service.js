const BaseService = require("./base.service");

class FileService extends BaseService {
  constructor({ FileRepository }) {
    super(FileRepository);
    this.repository = FileRepository;
  }
}
module.exports = FileService;
