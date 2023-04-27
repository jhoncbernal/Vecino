const BaseController = require("./base.controller");
let _authService = null;

class AuthController extends BaseController {
  constructor({ AuthService }) {
    super(AuthService);
    _authService = AuthService;
  }
}

module.exports = AuthController;
