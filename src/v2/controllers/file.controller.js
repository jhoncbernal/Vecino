const BaseController = require("./base.controller");

class FileController extends BaseController {
  constructor({ FileService }) {
    super(FileService);
    this.service = FileService;
  }
}
module.exports = FileController;
