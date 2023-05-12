import { generateOtp } from "../../utils/generate.utils.js";
import BaseService from "./base.service.js";
class AuthService extends BaseService {
  constructor({ AuthRepository }) {
    super(AuthRepository);
    this.repository = AuthRepository;
  }

  async create(userData) {
    const otpCode = generateOtp();
    userData.otpCode = otpCode;
    const user = await this.repository.create(userData);
    delete user.otpCode;
    return user;
  }

  async verifyOtp(email, otpCode) {
    const auth = await this.repository.verifyOtp(email, otpCode);
    return auth;
  }

  async resendOtp(email) {
    const otpCode = generateOtp();
    const auth = await this.repository.resendOtp(email, otpCode);
    return auth;
  }
}
export default AuthService;
