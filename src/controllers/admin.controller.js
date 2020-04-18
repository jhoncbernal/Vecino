let _adminService,
  _authService = null;
class AdminController {
  constructor({ AdminService, AuthService }) {
    _adminService = AdminService;
    _authService = AuthService;
  }
  async get(req, res) {
    const { adminId } = req.params;
    const admin = await _adminService.get(adminId);
    return res.send(admin);
  }
  async getAll(req, res) {
    const { pageSize, pageNum } = req.query;
    const admins = await _adminService.getAll(
      "uniquecode",
      { $exists: true },
      pageSize,
      pageNum
    );
    return res.send(admins);
  }
  async update(req, res) {
    const { body } = req;
    const { adminId } = req.params;

    if (body.uniquecode) {
      delete body.uniquecode;
    }
    if (body.totalNumberOfUsers) {
      delete body.totalNumberOfUsers;
    }
    const updateAdmin = await _adminService.update(adminId, body);
    return res.send(updateAdmin);
  }
  async delete(req, res) {
    const { adminId } = req.params;
    const deleteAdmin = await _adminService.delete(adminId);
    return res.send(deleteAdmin);
  }
  async create(req, res) {
    const { body } = req;
    const { baseUrl } = req;
    let host = req.headers.host + baseUrl;
    if (host.includes("admin")) {
      host = host.replace("admin", "auth");
    }
    await _adminService
      .create(body)
      .then((userService) => {
        return _authService
          .verifyEmail(userService, host)
          .then((sendVerifyUser) => {
            return res
              .status(200)
              .send({ userService, ...{ emailResult: sendVerifyUser } });
          })
          .catch((error) => {
            return res
              .status(error.status)
              .send({ userService, ...{ emailResult: error.message } });
          });
      })
      .catch((error) => {
        return res.status(error.status).send(error);
      });
  }
  async getAllNames(req, res) {
    const { pageSize, pageNum } = req.query;
    const admins = await _adminService.getAllAdminNames(pageSize, pageNum);
    return res.send(admins);
  }
}
module.exports = AdminController;
