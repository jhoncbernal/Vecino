import BaseRepository from "./base.repository.js";

class NotificationRepository extends BaseRepository {
  constructor({ Notification }) {
    super(Notification);
    this.repository = Notification;
  }
}

export default NotificationRepository;
