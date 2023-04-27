const BaseService = require("./base.service");
let _auth = null;

class AuthRepository extends BaseService {
  constructor({ Auth }) {
    super(Auth);
    _auth = Auth;
  }
}

module.exports = AuthRepository;
