import BaseRepository from "./base.repository.js";

class NotificationRepository extends BaseRepository {
  constructor({ Notification, eventBus }) {
    super(Notification, eventBus);
    this.model = Notification;
  }
}

export default NotificationRepository;
