const { uploadImage, deleteImage } = require("../helpers");
const createError = require("../utils/createError");

let _fileService,
  _userService,
  _adminService = null;
class FileController {
  constructor({ FileService, UserService, AdminService }) {
    _fileService = FileService;
    _userService = UserService;
    _adminService = AdminService;
  }

  async uploadFilePortfolioUsers(req, res) {
    try {
      const { uniquecode } = req.user;
      if (!req.files) createError(400, "No files were uploaded.");
      await _fileService.uploadFilePortfolioUsers(req.files.file.data);
      const users = await _userService.updateUserPoints(
        "uniquecode",
        uniquecode
      );
      if (!users) createError(400, "Error al actualizar los puntos");
      return res.status(200).send({ message: "Updated" });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ message: error?.message || "An error has occurred" });
    }
  }

  async uploadFileUsers(req, res) {
    try {
      const { uniquecode } = req.user;
      if (!req.files) createError(400, "No files were uploaded.");
      await _fileService.uploadFileUsers(req.files.file.data, uniquecode);
      return res.status(200).send({ message: "Updated" });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ message: error?.message || "An error has occurred" });
    }
  }

  async uploadFileImage(req, res) {
    if (!req.files) {
      return res.status(400).send("No images were uploaded.");
    }
    const result = await uploadImage(req.files.image);
    res.status(200).send(result);
  }

  async deleteFileImage(req, res) {
    const { KeyId } = req.params;
    const response = await deleteImage(KeyId);
    res.status(200).send(response);
  }

  async getUserByDocumentId(req, res) {
    const { documentId } = req.params;
    const user = await _fileService.getUserByDocumentId(documentId);
    if (!user) createError(400, "Error al obtener el usuario");
    return res.status(200).send(user);
  }
  async deleteByDocumentId(req, res) {
    const { documentId } = req.params;
    const deleteUser = await _fileService.deleteByDocumentId(documentId);
    return res.send(deleteUser);
  }
}
module.exports = FileController;
