const BaseRepository = require("./base.repository");

class AuthRepository extends BaseRepository {
  constructor({ Auth }) {
    super(Auth);
    this.repository = Auth;
  }
}

module.exports = AuthRepository;
