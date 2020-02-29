let _authService = null


class AuthController {
    constructor({ AuthService }) {
        _authService = AuthService;
    }
    async signUp(req, res) {
        const { body } = req;
        const { baseUrl } = req;
        const host = req.headers.host + baseUrl;
        await _authService.signUp(body)
            .then((userService) => {
                return _authService.verifyEmail(userService, host)
                    .then((sendVerifyUser) => {
                        return res.status(200).send({ userService, ...{ "emailResult": sendVerifyUser } });
                    }).catch((error) => {
                        return res.status(500).send({ userService, ...{ "emailResult": error.message } });
                    });
            }).catch((error) => {
                return res.status(500).send({ "error": error.message });
            });;


    }
    async signIn(req, res) {
        const { body } = req;
        const creds = await _authService.signIn(body)
        return res.status(200).send(creds);
    }

    async signUpNeighborhood(req, res) {
        const { body } = req;
        const createdNeighborhood = await _authService.signUpNeighborhood(body)
        return res.status(200).send(createdNeighborhood);
    }
    async signInNeighborhood(req, res) {
        const { body } = req;
        const creds = await _authService.signInNeighborhood(body)
        return res.status(200).send(creds);
    }

    async recover(req, res) {
        try {
            const { body, baseUrl } = req;
            const host = req.headers.host + baseUrl;
            await _authService.recover(body, host).then((successMessage) => {
                return res.status(200).send(successMessage);
            }).catch((error) => { throw error });
        } catch (e) {
            return res.status(500).send(e.message);
        }
    }
    async reset(req, res) {
        const { token } = req.params;
        const resetUser = await _authService.reset(token)
        return res.status(200).send(resetUser);
    }
    async resetPassword(req, res) {
        const { token } = req.params;
        const { body } = req;
        const resetPasswordUser = await _authService.resetPassword(token, body)
        return res.status(200).send(resetPasswordUser);
    }
    async verifyEmail(req, res) {
        try {
            const { body } = req;
            const { baseUrl } = req;
            const host = req.headers.host + baseUrl;
            await _authService.verifyEmail(body, host).then((successMessage) => {
                return res.status(200).send(successMessage);
            }).catch((error) => { throw error });
        } catch (e) {
            return res.status(500).send(e.message);
        }
    }
    async verify(req, res) {
        const { token } = req.params;
        const resetUser = await _authService.verify(token)
        return res.status(200).send(resetUser);
    }
}
module.exports = AuthController;