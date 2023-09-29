import BaseService from "./base.service.js";
import { deleteImage, uploadImage } from "../../helpers/index.js";

class FileService extends BaseService {
  constructor({ FileRepository }) {
    super(FileRepository);
    this.repository = FileRepository;
  }

  async create(document) {
    try {
      const s3File = await uploadImage(document.file);
      delete document.file;
      document.fileUrl = s3File.Location;
      const result = await this.repository.create(document);
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async deleteById(id){
    try {
      const s3File = await deleteImage(id);
      if (!s3File) {
        throw new Error("File not found");
      }
      const result = await this.repository.deleteById(id);
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
export default FileService;
