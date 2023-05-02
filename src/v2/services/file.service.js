import BaseService from "./base.service.js";

class FileService extends BaseService {
  constructor({ FileRepository }) {
    super(FileRepository);
    this.repository = FileRepository;
  }
}
export default FileService;
