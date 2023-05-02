import bindMethods from "../../utils/bindMethods.js";
import BaseController from "./base.controller.js";

class AuthController extends BaseController {
  constructor({ AuthService }) {
    super(AuthService);
    this.service = AuthService;
    bindMethods(this);
  }
}

export default AuthController;
