const { generateToken, generateTokenAdmin, generateTokenOwner } = require('../helpers/jwt.helper');
const { SECRET_OWNER } = require('../config');
const { sendEmail } = require('../helpers');

let _userService = null;
let _neighborhoodService = null;

class AuthService {
    constructor({ UserService, NeighborhoodService }) {
        _userService = UserService;
        _neighborhoodService = NeighborhoodService;
    }
    async signUpNeighborhood(neighborhood) {
        const { username } = neighborhood;
        const neighborhoodExist = await _neighborhoodService.getNeighborhoodByUsername(username);
        if (neighborhoodExist) {
            const error = new Error();
            error.status = 409;
            error.message = "Neighborhood already exists";
            throw error;
        }
        return await _neighborhoodService.create(neighborhood);
    }
    async signUp(userBody) {
        const { neighborhoodcode } = userBody;
        userBody.enabled = false;
        const userExist = await selectNeighborhoodOrUserProperty("neighborhoodcode", neighborhoodcode, true).catch(err => { throw err });
        if (userBody.roles.includes("ROLE_USER_ACCESS")) {
            return _userService.create({ ...userBody, neighborhood: userExist.user._id })
                .catch((error) => {
                    if (error.message.includes("duplicate key")) {
                        const error = new Error();
                        error.status = 500;
                        error.message = "username or email alredy exists";
                        throw error;
                    }
                    if (error) throw error;
                });
        }
        if (userBody.roles.includes("ROLE_ADMINISTRATION_ACCESS") && !userExist.user.isVerified) {
            return _neighborhoodService.update(userExist.user._id, userBody)
                .then((user) => { return user.save(); }
                );
        } else {
            const error = new Error();
            error.status = 400;
            error.message = "User alredy exist";
            throw error;
        }

    }
    async signIn(user) {
        const { username, email, password, secretKey } = user;
        let propName, value = null;
        if (username) {
            propName = "username",
            value = username
        } else {
            propName = "email",
            value = email
        }
        return await selectNeighborhoodOrUserProperty(propName, value)
            .then((userExist) => {
                let validPassword;
                let token;
                if (userExist.user) {
                    validPassword = userExist.user.comparePasswords(password);
                    if (!validPassword) {
                        const error = new Error();
                        error.status = 400;
                        error.message = "Invalid Password";
                        throw error;
                    }
                    if (userExist.user.roles.includes("ROLE_USER_ACCESS") && validPassword) {
                        const userToEncode = {
                            username: userExist.user.email,
                            id: userExist.user._id
                        };
                        token = generateToken(userToEncode);
                    }
                    if (userExist.user.roles.includes("ROLE_OWNER_ACCESS") && secretKey && validPassword) {
                        if (secretKey != SECRET_OWNER) {
                            const error = new Error();
                            error.status = 400;
                            error.message = "Invalid secretKey";
                            throw error;
                        }
                        const userToEncode = {
                            username: userExist.user.email,
                            id: userExist.user._id
                        };
                        token = generateTokenOwner(userToEncode);
                    }
                    if (userExist.user.roles.includes("ROLE_ADMINISTRATION_ACCESS") && validPassword) {
                        const neighborhoodToEncode = {
                            username: userExist.user.email,
                            id: userExist.user._id
                        };
                        token = generateTokenAdmin(neighborhoodToEncode);
                    }
                }
                if (!token) {
                    const error = new Error();
                    error.status = 400;
                    error.message = "Validate user role access";
                    throw error;
                }
                return { token, user: userExist.user };
            });

    }

    async recover(body, host) {
        const userExist = await selectNeighborhoodOrUserProperty("email", body.email);

        return await userExist.service.recover(body, host)
            .then(user => {
                if (!user) {
                    const err = new Error();
                    err.status = 404;
                    err.message = 'The email address ' + body.email + ' is not associated with any account. Double-check your email address and try again.';
                    throw err;
                }
                //Generate and set password reset token
                user.generatePasswordReset();
                // Save the updated user object
                return user.save()
            })
            .then(user => {
                return sendEmail(user, "Password change request",
                    `http://${host}/reset/${user.resetPasswordToken}`,
                    ('../public/pages/recoverypassword.html'))
                    .then((result) => {
                        return { ...{ "message": "Password change request" }, ... { "email": { result } } };
                    }).catch((error) => {
                        throw error;
                    })
            })
            .catch((error) => {
                throw error
            });
    }
    async reset(token) {
        const userExist = await selectNeighborhoodOrUserProperty("resetPasswordToken", token);
        return await userExist.service.reset(token)
            .then((user) => {
                if (!user) {
                    const err = new Error();
                    err.status = 401;
                    err.message = 'Password reset token is invalid or has expired.';
                    throw err;
                }
                return { "reset": { user } };
            })
            .catch(err => { throw err });
    }
    async resetPassword(token, body) {
        const userExist = await selectNeighborhoodOrUserProperty("resetPasswordToken", token);
        return await userExist.service.resetPassword(token)
            .then((user) => {
                if (!user) {
                    const err = new Error();
                    err.status = 401;
                    err.message = 'Password reset token is invalid or has expired.';
                    throw err;
                }
                //Set the new password
                user.password = body.password; 1
                user.resetPasswordToken = undefined;
                user.resetPasswordExpires = undefined;

                // Save
                return user.save()
            })
            .then(user => {
                return sendEmail(user,
                    "Your password has been changed", `
                El dia de hoy, se realizo exitosamente el cambio de contraseña a cuenta registrada con el email ${user.email} `,
                    ('../public/pages/changeconfirmation.html'))
                    .then((result) => {
                        return { ...{ "message": "Your password has been changed" }, ... { "email": { result } } };
                    }).catch((error) => {
                        throw error;
                    })
            })
            .catch((error) => {
                throw error
            });
    }
    async verifyEmail(body, host) {
        return await selectNeighborhoodOrUserProperty("email", body.email, true)
            .then((userExist) => {
                return userExist.service.verifyEmail(body)
                    .then(user => {
                        if (!user) {
                            const err = new Error();
                            err.status = 404;
                            err.message = 'The email address ' + body.email + ' is not associated with any account. Double-check your email address and try again.';
                            throw err;
                        }
                        //Generate and set password reset token
                        user.generatePasswordReset();
                        // Save the updated user object
                        return user.save()
                            .then(user => {
                                return sendEmail(user, "Please Verify your Vecino Account",
                                    `http://${host}/verify/${user.resetPasswordToken}`,
                                    ('../public/pages/verifyemail.html'))
                                    .then((result) => {
                                        return { ...{ "message": "Verify Account" }, ... { "email": { result } } };
                                    }).catch((error) => {
                                        throw error;
                                    })
                            });
                    })

                    .catch((error) => {
                        throw error
                    });
            });

    }
    async verify(token) {
        const userExist = await selectNeighborhoodOrUserProperty("resetPasswordToken", token, true);
        return await userExist.service.verify(token)
            .then((user) => {
                if (!user) {
                    const err = new Error();
                    err.status = 401;
                    err.message = 'Verify token is invalid or has expired.';
                    throw err;
                }
                if (!user.isVerified) { user.enabled = true };
                //Set the new values
                user.isVerified = true;
                user.resetPasswordToken = undefined;
                user.resetPasswordExpires = undefined;
                // Save
                return user.save()
            })
            .then(user => {
                return sendEmail(user,
                    "Your email has been verified", `
                Se realizo exitosamente la verificación de la cuenta registrada con el email ${user.email} `,
                    ('../public/pages/changeconfirmation.html'))
                    .then((result) => {
                        return { ...{ "message": "Your email has been verified" }, ... { "email": { "aceptado por": result.accepted, "rechazado por": result.rejected } } };
                    }).catch((error) => {
                        throw error;
                    })
            })
            .catch((error) => {
                throw error
            });
    }

}
async function selectNeighborhoodOrUserProperty(propName, value, signUp = false) {
    const userExist = await _userService.getUserByProperty(propName, value);
    const neighborhoodExist = await _neighborhoodService.getNeighborhoodByProperty(propName, value);
    if (!userExist && !neighborhoodExist) {
        const error = new Error();
        error.status = 404;
        error.message = `${propName} does not exist`;
        throw error;
    }

    let _service = null;
    let _user = null;
    if (neighborhoodExist) {
        _service = _neighborhoodService;
        _user = neighborhoodExist;
    } else {
        _service = _userService;
        _user = userExist;
    }
    if ((!_user.isVerified) && !signUp) {
        const error = new Error();
        error.status = 400;
        error.message = "User has not been verified";
        throw error;
    }
    if ((!_user.enabled) && !signUp) {
        const error = new Error();
        error.status = 400;
        error.message = "User disabled";
        throw error;
    }
    return { "service": _service, "user": _user };

}
module.exports = AuthService;