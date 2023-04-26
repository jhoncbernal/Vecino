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
       await _fileService.uploadFilePortfolioUsers(
        req.files.file.data,
        uniquecode
      );
      const users = await _userService.updateUserPoints(
        "uniquecode",
        uniquecode
      );
      if (!users) createError(400, "Error al actualizar los puntos");
      return res.status(200).send({ message: "Updated" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "An error has occurred" });
    }
  }
  async uploadFileUsers(req, res) {
    try {
      if (!req.files) {
        return res.status(400).send("No files were uploaded.");
      }
      await _fileService.uploadFileUsers(req.files.file.data);
      return res.status(200).send({ message: "Updated" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "An error has occurred" });
    }
  }
  async uploadFileImage(req, res) {
    if (!req.files) {
      return res.status(400).send("No images were uploaded.");
    }
    await uploadImage(req.files.image)
      .then((response) => {
        res.status(200).send(response);
      })
      .catch((err) => {
        throw err;
      });
  }
  async deleteFileImage(req, res) {
    const { KeyId } = req.params;
    await deleteImage(KeyId)
      .then((response) => {
        res.status(200).send(response);
      })
      .catch((err) => {
        throw err;
      });
  }
  async getUserByDocumentId(req, res) {
    const { documentId } = req.params;
    const user = await _fileService.getUserByDocumentId(documentId);
    return res.status(200).send(user);
  }
  async delete(req, res) {
    const { Id } = req.params;
    const deleteUser = await _fileService.delete(Id);
    return res.send(deleteUser);
  }
}
module.exports = FileController;
