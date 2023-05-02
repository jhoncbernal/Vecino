import BaseRepository from "./base.repository.js";

class AuthRepository extends BaseRepository {
  constructor({ Auth }) {
    super(Auth);
    this.repository = Auth;
  }
}

export default AuthRepository;
