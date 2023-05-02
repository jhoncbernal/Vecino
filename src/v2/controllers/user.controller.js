import bindMethods from "../../utils/bindMethods.js";
import BaseController from "./base.controller.js";

class UserController extends BaseController {
  constructor({ UserService }) {
    super(UserService);
    this.service = UserService;
    bindMethods(this);
  }
}

export default UserController;
