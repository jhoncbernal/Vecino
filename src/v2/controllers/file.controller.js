import BaseController from "./base.controller.js";

class FileController extends BaseController {
  constructor({ FileService }) {
    super(FileService);
    this.service = FileService;
  }
}
export default FileController;
