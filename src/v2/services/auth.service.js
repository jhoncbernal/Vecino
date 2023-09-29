import { generateOtp } from "../../utils/generate.utils.js";
import BaseService from "./base.service.js";
class AuthService extends BaseService {
  constructor({ AuthRepository, logger, mailer }) {
    super(AuthRepository);
    this.repository = AuthRepository;
    this.logger = logger;
    this.mailer = mailer;
  }

  async create(userData, user) {
    const otpCode = generateOtp();
    userData.otpCode = otpCode;

    let existingUser = await this.repository.getByEmail(userData.email);

    if (existingUser) {
      existingUser = this.updateExistingUser(existingUser, userData);
    } else {
      existingUser = await this.createAndStoreNewUser(userData, user);
      await this.sendOtpCode(existingUser.email, otpCode);
    }

    const auth = await this.repository.getById(existingUser._id);
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
  
  updateExistingUser(user, userData) {
    if (!user.providers.includes("local")) {
      user.providers.push("local");
      user.password = userData.password;
      user.save();
    }else {
      throw new Error("User already exists");
    }
    return user;
  }

  async createAndStoreNewUser(userData, user) {
    userData.providers = ["local"];
    return await this.repository.create(userData, user);
  }

  async sendOtpCode(email, otpCode) {
    await this.mailer.sendEmail(
      email,
      "OTP Code",
      { OTP: `${otpCode}` },
      "verifyemail"
    );
  }
}
export default AuthService;
