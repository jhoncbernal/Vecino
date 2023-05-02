import BaseService from "./base.service.js";
class AuthService extends BaseService {
  constructor({ AuthRepository }) {
    super(AuthRepository);
    this.repository = AuthRepository;
  }
}

export default AuthService;
