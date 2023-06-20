import BaseRepository from "./base.repository.js";

class UserRepository extends BaseRepository {
  constructor({ User , eventBus}) {
    super(User, eventBus);
    this.model = User;
  }

}

export default UserRepository;
