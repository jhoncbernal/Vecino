import BaseRepository from "./base.repository.js";

class NotificationRepository extends BaseRepository {
  constructor({ Notification }) {
    super(Notification);
    this.model = Notification;
  }
}

export default NotificationRepository;
