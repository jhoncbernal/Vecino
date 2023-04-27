const BaseController = require("./base.controller");
let _notificationService = null;

class NotificationController extends BaseController {
  constructor({ NotificationService }) {
    super(NotificationService);
    _notificationService = NotificationService;
  }
}

module.exports = NotificationController;
