const { generateToken, generateTokenAdmin, generateTokenOwner } = require('../helpers/jwt.helper');
const { SECRET_OWNER } = require('../config');
const { sendEmail, HTMLReplace } = require('../helpers');

let _userService = null;
let _adminService = null;

class AuthService {
    constructor({ UserService, AdminService }) {
        _userService = UserService;
        _adminService = AdminService;
    }
    async signUpAdmin(admin) {
        const { username } = admin;
        const adminExist = await _adminService.getAdminByUsername(username);
        if (adminExist) {
            const error = new Error();
            error.status = 409;
            error.message = "Admin already exists";
            throw error;
        }
        return await _adminService.create(admin);
    }
    async signUp(userBody) {
        const { neighborhoodcode } = userBody;
        userBody.enabled = false;
        let userExist;
        if ((userBody.roles.includes("ROLE_OWNER_ACCESS"))) {
            if (!userBody.secretKey) {
                const error = new Error();
                error.status = 400;
                error.message = "For owner role secretKey must be sent";
                throw error;
            }
            if (userBody.secretKey != SECRET_OWNER) {
                const error = new Error();
                error.status = 400;
                error.message = "Invalid secretKey";
                throw error;
            }
            return _userService.create({ ...userBody })
                .catch((error) => {
                    if (error.message.includes("duplicate key")) {
                        const error = new Error();
                        error.status = 500;
                        error.message = "username or email alredy exists";
                        throw error;
                    }
                    if (error) throw error;
                });
        } else {
            userExist = await selectAdminOrUserProperty("neighborhoodcode", neighborhoodcode, true).catch(err => { throw err });
            if (userBody.roles.includes("ROLE_USER_ACCESS")) {
                return _userService.create({ ...userBody, admin: userExist.user._id })
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
                return _adminService.update(userExist.user._id, userBody)
                    .then((user) => { return user.save(); }
                    );
            } else {
                const error = new Error();
                error.status = 400;
                error.message = "User alredy exist";
                throw error;
            }
        }

    }
    async signIn(user, singUp = false) {
        const { username, email, password, secretKey } = user;
        let propName, value = null;
        if (username) {
            propName = "username",
                value = username
        } else {
            propName = "email",
                value = email
        }
        return await selectAdminOrUserProperty(propName, value, singUp)
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
                        const adminToEncode = {
                            username: userExist.user.email,
                            id: userExist.user._id
                        };
                        token = generateTokenAdmin(adminToEncode);
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
        const { username, email } = body;
        let propName, value = null;
        if (username) {
            propName = "username",
                value = username
        } else {
            propName = "email",
                value = email
        }
        const userExist = await selectAdminOrUserProperty(propName, value);

        return await userExist.service.recover(propName, value)
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
                        return { ...{ "message": "Password change request" }, ... { "emailResult": { result } } };
                    }).catch((error) => {
                        throw error;
                    })
            })
            .catch((error) => {
                throw error
            });
    }
    async reset(token) {
        const userExist = await selectAdminOrUserProperty("resetPasswordToken", token);
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
        const userExist = await selectAdminOrUserProperty("resetPasswordToken", token);
        return await userExist.service.resetPassword(token)
            .then((user) => {
                if (!user) {
                    const err = new Error();
                    err.status = 401;
                    err.message = 'Password reset token is invalid or has expired.';
                    throw err;
                }
                //Set the new password
                user.password = body.password;
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
        return await selectAdminOrUserProperty("email", body.email, true)
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
        let replacements = null;
        const userExist = await selectAdminOrUserProperty("resetPasswordToken", token, true);
        return await userExist.service.verify(token)
            .then((user) => {
                if (!user) {
                    const err = new Error();
                    err.status = 401;
                    err.message = 'Verify token is invalid or has expired.';
                    throw err;
                } if (user.email.length < 5 ||
                    user.firstName.length < 3 ||
                    user.phone.length < 8 ||
                    user.documentId.toString().length < 8) {
                    replacements = {
                        email: user.email,
                        name: user.firstName,
                        address: user.address,
                        phone: user.phone,
                        documentId: user.documentId
                    };
                } else {
                    if (!user.isVerified) { user.enabled = true };
                    //Set the new values
                    user.isVerified = true;
                    user.resetPasswordToken = undefined;
                    user.resetPasswordExpires = undefined;

                }

                // Save
                return user.save().then((user) => {
                    return sendEmail(user,
                        "Your email has been verified", `
                    Se realizo exitosamente la verificación de la cuenta registrada con el email ${user.email} `,
                        ('../public/pages/changeconfirmation.html')).then(() => {


                            if (replacements != null) {
                                return HTMLReplace(('../public/pages/verifyform.html'), replacements).then((result) => { return result });
                            }
                            else {
                                replacements = {
                                    username: user.firstName,
                                    link: `Se realizo exitosamente la verificación de la cuenta registrada con el email ${user.email} `
                                };
                                return HTMLReplace(('../public/pages/changeconfirmation.html'), replacements).then((result) => { return result });
                            }
                        }).catch((error) => {
                            throw error;
                        });

                });

            })
            .catch((error) => {
                throw error
            });
    }

}
async function selectAdminOrUserProperty(propName, value, signUp = false) {
    const userExist = await _userService.getUserByProperty(propName, value);
    const adminExist = await _adminService.getAdminByProperty(propName, value);
    if (!userExist && !adminExist) {
        const error = new Error();
        error.status = 404;
        error.message = `${propName} does not exist`;
        throw error;
    }

    let _service = null;
    let _user = null;
    if (adminExist) {
        _service = _adminService;
        _user = adminExist;
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