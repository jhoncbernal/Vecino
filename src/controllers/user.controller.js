let _userService,
  _adminService = null;
class UserController {
  constructor({ UserService, AdminService }) {
    _userService = UserService;
    _adminService = AdminService;
  }
  async get(req, res) {
    const { userId } = req.params;
    const user = await _userService.get(userId);
    return res.send(user);
  }
  async getAll(req, res) {
    const { id: userId } = req.user;
    const { pageSize, pageNum } = req.query;
    const admin = await _adminService.get(userId);
    const users = await _userService.getAll(
      "uniquecode",
      admin.uniquecode,
      pageSize,
      pageNum
    );
    return res.send(users);
  }
  async update(req, res) {
    const { body } = req;
    const { userId } = req.params;
    const updateUser = await _userService.update(userId, body);
    return res.send(updateUser);
  }
  async delete(req, res) {
    const { userId } = req.params;
    const deleteUser = await _userService.delete(userId);
    return res.send(deleteUser);
  }
  async getUsersByPoints(req, res) {
    try {
      const { id: userId } = req.user;
      const { pageSize, pageNum } = req.query;
      const admin = await _adminService.get(userId).catch((err) => {
        return res.status(error.status).send(err);
      });
      const users = await _userService.getUsersByPoints(
        "uniquecode",
        admin.uniquecode,
        pageSize,
        pageNum
      );
      return res.send(users);
    } catch (err) {
      return res.status(error.status).send(err);
    }
  }
}
module.exports = UserController;
