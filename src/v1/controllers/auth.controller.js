const { FRONT_END_URL } = require("../config");

let _authService,
  _userService = null;
class AuthController {
  constructor({ AuthService, UserService }) {
    _authService = AuthService;
    _userService = UserService;
  }

  async signUp(req, res) {
    try {
      const { body } = req;
      const result = await _authService.signUp(body);

      return res.status(200).send(result);
    } catch (error) {
      if (error.message.includes("duplicate key")) {
        const error = new Error();
        error.status = 500;
        error.message = "username or email already exists";
        throw error;
      }
      throw error;
    }
  }

  async signIn(req, res) {
    const { body } = req;
    const creds = await _authService.signIn(body);
    return res.status(200).send(creds);
  }

  async signUpProvider(req, res) {
    const { body } = req;
    const createdProvider = await _authService.signUpProvider(body);
    return res.status(200).send(createdProvider);
  }

  async signInAndUpdate(req, res) {
    const { body } = req;
    const result = await _authService.signIn(body, true);
    await _authService.signInAndUpdate(result.user, body);
    return res.redirect(FRONT_END_URL); //send("Actualizacion de datos exitosa");
  }

  async recover(req, res) {
    const { body } = req;
    const result = await _authService.recover(body);
    return res.status(200).send(result);
  }

  async reset(req, res) {
    const { token } = req.params;
    const resetUser = await _authService.reset(token);
    return res.status(200).send(resetUser);
  }

  async resetPassword(req, res) {
    const { token } = req.params;
    const { body } = req;
    const resetPasswordUser = await _authService.resetPassword(token, body);
    return res.status(200).send(resetPasswordUser);
  }

  async verifyEmail(req, res) {
    const { body } = req;
    const { email } = body;
    const result = await _authService.verifyEmail(email);
    return res.status(200).send(result);
  }

  async verify(req, res) {
    const { token } = req.params;
    const resetUser = await _authService.verify(token);
    return res.status(200).send(resetUser);
  }
}
module.exports = AuthController;
