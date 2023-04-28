const bindMethods = require("../../utils/bindMethods");
const BaseController = require("./base.controller");

class NotificationController extends BaseController {
  constructor({ NotificationService }) {
    super(NotificationService);
    this.service = NotificationService;
    bindMethods(this);
  }
}

module.exports = NotificationController;
