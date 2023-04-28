const BaseRepository = require("./base.repository");

class UserRepository extends BaseRepository {
  constructor({ User }) {
    super(User);
    this.repository = User;
  }
}

module.exports = UserRepository;
