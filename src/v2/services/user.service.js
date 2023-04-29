const BaseService = require("./base.service");
class UserRepository extends BaseService {
  constructor({ UserRepository }) {
    super(UserRepository);
    this.repository = UserRepository;
  }
}

module.exports = UserRepository;
