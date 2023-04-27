const BaseRepository = require("./base.repository");
let _auth = null;

class AuthRepository extends BaseRepository {
  constructor({ Auth }) {
    super(Auth);
    _auth = Auth;
  }
}

module.exports = AuthRepository;
