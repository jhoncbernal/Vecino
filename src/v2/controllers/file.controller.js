import BaseController from "./base.controller.js";

class FileController extends BaseController {
  constructor({ FileService }) {
    super(FileService);
    this.service = FileService;
  }
  async create(req, res) {
    try {
      if (!req.files) {
        return res.status(400).send("No images were uploaded.");
      }
      const fileData = req.body;
      fileData.file = req.files.file;
      const saved = await this.service.create(fileData);
      return res.status(201).send(saved);
    } catch (error) {
      console.error(error);
      return res.status(400).send({ message: "Invalid Request" });
    }
  }
}
export default FileController;
