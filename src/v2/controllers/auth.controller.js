const bindMethods = require("../../utils/bindMethods");
const BaseController = require("./base.controller");

class AuthController extends BaseController {
  constructor({ AuthService }) {
    super(AuthService);
    this.service = AuthService;
    bindMethods(this);
  }
}

module.exports = AuthController;
