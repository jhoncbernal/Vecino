import bindMethods from "../../utils/bindMethods.js";
import BaseController from "./base.controller.js";

class UserController extends BaseController {
  constructor({ UserService, logger }) {
    super(UserService, logger);
    this.service = UserService;
    bindMethods(this);
  }
}

export default UserController;
