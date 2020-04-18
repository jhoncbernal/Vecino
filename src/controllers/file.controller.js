const { uploadImage } = require("../helpers");

let _fileService,
  _userService,
  _adminService = null;
class FileController {
  constructor({ FileService, UserService, AdminService }) {
    _fileService = FileService;
    _userService = UserService;
    _adminService = AdminService;
  }

  async uploadFileCSV(req, res) {
    const { id: userId } = req.user;
    const admin = await _adminService.get(userId);
    if (!req.files) {
      return res.status(400).send("No files were uploaded.");
    }
    const result = await _fileService
      .uploadFileCSV(req.files.file.data)
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
}
module.exports = FileController;
