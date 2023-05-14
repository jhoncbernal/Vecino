import { generateOtp } from "../../utils/generate.utils.js";
import BaseService from "./base.service.js";
class AuthService extends BaseService {
  constructor({ AuthRepository, logger, mailer }) {
    super(AuthRepository);
    this.repository = AuthRepository;
    this.logger = logger;
    this.mailer = mailer;
  }

  async create(userData) {
    const otpCode = generateOtp();
    userData.otpCode = otpCode;
    const user = await this.repository.create(userData);
    const auth = await this.repository.getById(user._id);
    this.mailer.sendEmail(
      user.email,
      "OTP Code",
      { OTP: `${otpCode}` },
      "verifyemail"
    );
    return auth.toJSON();
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
