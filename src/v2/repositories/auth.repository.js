import { handleMongoError } from "../../utils/mongoErrorHandler.util.js";
import BaseRepository from "./base.repository.js";

class AuthRepository extends BaseRepository {
  constructor({ Auth }) {
    super(Auth);
    this.model = Auth;
  }

  async verifyOtp(email, otpCode) {
    try {
      const auth = await this.model.findOne({
        email: email,
        otpCode: otpCode,
        isVerified: false,
      });
      if (!auth) {
        throw new Error("Invalid OTP or already verified");
      }
      await this.model.updateOne(
        { _id: auth._id },
        {
          otpCode: null,
          isVerified: true,
        }
      );
      return auth;
    } catch (error) {
      console.error(error);
      throw handleMongoError(error);
    }
  }

  async resendOtp(email, otpCode) {
    try {
      const auth = await this.model.findOne({
        email: email,
        isVerified: false,
      });
      if (!auth) {
        throw new Error("Invalid email or email already verified");
      }
      await this.model.updateOne(
        { _id: auth._id },
        {
          otpCode: otpCode,
        }
      );
      return auth;
    } catch (error) {
      console.error(error);
      throw handleMongoError(error);
    }
  }
}

export default AuthRepository;
