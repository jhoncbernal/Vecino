import BaseRepository from "./base.repository.js";

class AuthRepository extends BaseRepository {
  constructor({ Auth }) {
    super(Auth);
    this.model = Auth;
  }
}

export default AuthRepository;
