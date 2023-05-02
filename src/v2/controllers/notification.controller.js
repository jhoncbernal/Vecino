import bindMethods from "../../utils/bindMethods.js";
import BaseController from "./base.controller.js";

class NotificationController extends BaseController {
  constructor({ NotificationService }) {
    super(NotificationService);
    this.service = NotificationService;
    bindMethods(this);
  }
}

export default NotificationController;
