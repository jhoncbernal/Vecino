const BaseService = require("./base.service");
let _user = null;

class UserRepository extends BaseService {
  constructor({ User }) {
    super(User);
    _user = User;
  }
}

module.exports = UserRepository;
