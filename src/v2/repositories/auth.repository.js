import { handleMongoError } from "../../utils/mongoErrorHandler.util.js";
import BaseRepository from "./base.repository.js";

class AuthRepository extends BaseRepository {
  constructor({ Auth, eventBus }) {
    super(Auth, eventBus);
    this.model = Auth;
  }

  async verifyOtp(email, otpCode) {
    try {
      const auth = await this.model
        .findOne({
          email: email,
          otpCode: otpCode,
          isVerified: false,
        })
        .exec();
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
      return { ...auth.toJSON(), isVerified: true };
    } catch (error) {
      console.error(error);
      throw handleMongoError(error);
    }
  }

  async resendOtp(email, otpCode) {
    try {
      const auth = await this.model
        .findOne({
          email: email,
          isVerified: false,
        })
        .exec();
      if (!auth) {
        throw new Error("Invalid email or email already verified");
      }
      await this.model.updateOne(
        { _id: auth._id },
        {
          otpCode: otpCode,
        }
      );
      return auth.toJSON();
    } catch (error) {
      console.error(error);
      throw handleMongoError(error);
    }
  }
}

export default AuthRepository;
