import BaseService from "./base.service.js";
class NotificationService extends BaseService {
  constructor({ NotificationRepository }) {
    super(NotificationRepository);
    this.repository = NotificationRepository;
  }
}

export default NotificationService;
