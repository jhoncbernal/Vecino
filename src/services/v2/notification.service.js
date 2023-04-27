const BaseService = require("./base.service");
let _notification = null;

class NotificationRepository extends BaseService {
  constructor({ Notification }) {
    super(Notification);
    _notification = Notification;
  }
}

module.exports = NotificationRepository;
