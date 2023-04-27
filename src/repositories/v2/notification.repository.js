const BaseRepository = require("./base.repository");
let _notification = null;

class NotificationRepository extends BaseRepository {
  constructor({ Notification }) {
    super(Notification);
    _notification = Notification;
  }
}

module.exports = NotificationRepository;
