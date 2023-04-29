const BaseService = require("./base.service");
class AuthRepository extends BaseService {
  constructor({ AuthRepository }) {
    super(AuthRepository);
    this.repository = AuthRepository;
  }
}

module.exports = AuthRepository;
