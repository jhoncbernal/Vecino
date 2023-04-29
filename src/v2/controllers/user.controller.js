const bindMethods = require("../../utils/bindMethods");
const BaseController = require("./base.controller");

class UserController extends BaseController {
  constructor({ UserService }) {
    super(UserService);
    this.service = UserService;
    bindMethods(this);
  }
}

module.exports = UserController;
