const { uploadImage, deleteImage } = require("../helpers");

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
    const { id: userId } = req.user;
    const admin = await _adminService.get(userId);
    if (!req.files) {
      return res.status(400).send("No files were uploaded.");
    }
    const result = await _fileService
      .uploadFilePortfolioUsers(req.files.file.data)
      .catch((err) => {
        throw err;
      });
    if (result) {
      await _userService
        .updateUserPoints("uniquecode", admin.uniquecode)
        .catch((err) => {
          throw err;
        });
      return res.status(200).send("Updated");
    }
  }
  async uploadFileUsers(req, res) {
    if (!req.files) {
      return res.status(400).send("No files were uploaded.");
    }
    await _fileService
      .uploadFileUsers(req.files.file.data)
      .catch((err) => {
        throw err;
      });
      return res.status(200).send("Updated");

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
