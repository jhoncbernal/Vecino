import BaseService from "./base.service.js";
class UserService extends BaseService {
  constructor({ UserRepository }) {
    super(UserRepository);
    this.repository = UserRepository;
  }
}

export default UserService;
