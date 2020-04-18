let _authService,
  _userService = null;
class AuthController {
  constructor({ AuthService, UserService }) {
    _authService = AuthService;
    _userService = UserService;
  }
  /**
   * SignUp for user and AdminNeigboorhood
   * @param {*} req
   * @param {*} res
   */
  async signUp(req, res) {
    const { body } = req;
    const { baseUrl } = req;
    const host = req.headers.host + baseUrl;
    await _authService.signUp(body).then((userService) => {
      return _authService
        .verifyEmail(userService, host)
        .then((sendVerifyUser) => {
          return res
            .status(200)
            .send({ userService, ...{ emailResult: sendVerifyUser } });
        })
        .catch((error) => {
          return res.status(error.status).send({
            userService,
            ...{ emailResult: error.message },
            ...{ message: error.message },
          });
        });
    });
  }

  async signIn(req, res) {
    const { body } = req;
    if (!body.email.includes("@")) {
      body.username = body.email;
      delete body.email;
    }
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
    if (!body.email.includes("@")) {
      body.username = body.email;
      delete body.email;
    }
    const result = await _authService.signIn(body, true);

    delete body.password;
    await _authService.signInAndUpdate(result.user, body);
    return res.redirect("https://vecinofront.herokuapp.com/login"); //send("Actualizacion de datos exitosa");
  }
  async signInAdmin(req, res) {
    const { body } = req;
    const creds = await _authService.signInAdmin(body);
    return res.status(200).send(creds);
  }

  async recover(req, res) {
    const { body, baseUrl } = req;
    if (!body.email.includes("@")) {
      body.username = body.email;
      delete body.email;
    }
    const host = req.headers.host + baseUrl;
    await _authService
      .recover(body, host)
      .then((successMessage) => {
        return res.status(200).send(successMessage);
      })
      .catch((error) => {
        throw error;
      });
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
    const { baseUrl } = req;
    let host = req.headers.host + baseUrl;
    await _authService
      .verifyEmail(body, host)
      .then((successMessage) => {
        return res.status(200).send(successMessage);
      })
      .catch((error) => {
        throw error;
      });
  }
  async verify(req, res) {
    const { token } = req.params;
    const resetUser = await _authService.verify(token);

    return res.status(200).send(resetUser);
  }
}
module.exports = AuthController;
