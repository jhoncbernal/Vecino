import BaseRepository from "./base.repository.js";

class UserRepository extends BaseRepository {
  constructor({ User }) {
    super(User);
    this.repository = User;
  }
}

export default UserRepository;
