const BaseRepository = require("./base.repository");

class NotificationRepository extends BaseRepository {
  constructor({ Notification }) {
    super(Notification);
    this.repository = Notification;
  }
}

module.exports = NotificationRepository;
