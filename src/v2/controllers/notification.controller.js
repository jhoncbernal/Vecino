import bindMethods from "../../utils/bindMethods.js";
import BaseController from "./base.controller.js";

class NotificationController extends BaseController {
  constructor({ NotificationService, logger }) {
    super(NotificationService,  logger);
    this.service = NotificationService;
    bindMethods(this);
  }
}

export default NotificationController;
