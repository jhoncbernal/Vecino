import bindMethods from "../../utils/bindMethods.js";
import BaseController from "./base.controller.js";

class AuthController extends BaseController {
  constructor({ AuthService, logger }) {
    super(AuthService, logger);
    this.service = AuthService;
    this.logger = logger;
    bindMethods(this);
  }

  async create(req, res) {
    try {
      const userData = req.body;
      const saved = await this.service.create(userData);
      return res
        .status(201)
        .send({ ...saved, message: "OTP sent successfully" });
    } catch (error) {
      this.logger.error(error);
      return res
        .status(error?.statusCode || 400)
        .send({ message: error.message });
    }
  }

  async verifyOtp(req, res) {
    try {
      const { email, otp } = req.body;
      const result = await this.service.verifyOtp(email, otp);
      if (!result) {
        throw new Error("Invalid OTP");
      }
      return res
        .status(200)
        .send({ message: "OTP verified successfully", ...result });
    } catch (error) {
      this.logger.error(error);
      return res
        .status(error?.statusCode || 400)
        .send({ message: error.message });
    }
  }

  async resendOtp(req, res) {
    try {
      const { email } = req.body;
      const result = await this.service.resendOtp(email);
      if (!result) {
        throw new Error("Invalid OTP");
      }
      return res.status(200).send({ message: "OTP sent successfully" });
    } catch (error) {
      this.logger.error(error);
      return res
        .status(error?.statusCode || 400)
        .send({ message: error.message });
    }
  }

  async checkAuth(req, res) {
    try {
      return res
        .status(200)
        .send({ isAuthenticated: true, user: req.user });
    } catch (error) {
      this.logger.error(error);
      return res
        .status(error?.statusCode || 400)
        .send({ message: error.message , isAuthenticated: false});
    }
  }
}

export default AuthController;
