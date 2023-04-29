const BaseService = require("./base.service");
class NotificationRepository extends BaseService {
  constructor({ NotificationRepository }) {
    super(NotificationRepository);
    this.repository = NotificationRepository;
  }
}

module.exports = NotificationRepository;
