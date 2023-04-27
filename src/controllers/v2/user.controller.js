
const BaseController = require("./base.controller");
let _userService = null;

class UserController extends BaseController {
  constructor({ UserService }) {
    super(UserService);
    _userService = UserService;
  }
}

module.exports = UserController;


