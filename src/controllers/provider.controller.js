let _providerService,
  _authService = null;
class ProviderController {
  constructor({ ProviderService, AuthService }) {
    _providerService = ProviderService;
    _authService = AuthService;
  }
  async get(req, res) {
    const { providerId } = req.params;
    const provider = await _providerService.get(providerId);
    return res.send(provider);
  }
  async getAll(req, res) {
    const { pageSize, pageNum } = req.query;
    const providers = await _providerService.getAll(
      "uniquecode",
      { $exists: true },
      pageSize,
      pageNum
    );
    return res.send(providers);
  }
  async update(req, res) {
    const { body } = req;
    const { providerId } = req.params;

    if (body.uniquecode) {
      delete body.uniquecode;
    }
    if (body.totalNumberOfUsers) {
      delete body.totalNumberOfUsers;
    }
    const updateProvider = await _providerService.update(providerId, body);
    return res.send(updateProvider);
  }
  async delete(req, res) {
    const { providerId } = req.params;
    const deleteProvider = await _providerService.delete(providerId);
    return res.send(deleteProvider);
  }
  async create(req, res) {
    const { body } = req;
    const { baseUrl } = req;
    let host = req.headers.host + baseUrl;
    if (host.includes("provider")) {
      host = host.replace("provider", "auth");
    }
    await _providerService
      .create(body)
      .then((userService) => {
        return _authService
          .verifyEmail(userService, host)
          .then((sendVerifyUser) => {
            return res
              .status(200)
              .send({ userService, ...{ emailResult: sendVerifyUser } });
          })
          .catch((error) => {
            return res
              .status(error.status)
              .send({ userService, ...{ emailResult: error.message } });
          });
      })
      .catch((error) => {
        return res.status(error.status).send(error);
      });
  }
  async getAllNames(req, res) {
    const { city } = req.params;
    const { pageSize, pageNum } = req.query;
    const providers = await _providerService.getAllProviderNames(city,
      pageSize,
      pageNum
    );
    return res.send(providers);
  }
}
module.exports = ProviderController;
