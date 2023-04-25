const { generateToken } = require("../helpers/jwt.helper");
const { SECRET_OWNER, FRONT_END_URL } = require("../config");
const { sendEmail } = require("../helpers");

let _userService,
  _providerService,
  _adminService = null;

class AuthService {
  constructor({ UserService, AdminService, ProviderService }) {
    _userService = UserService;
    _adminService = AdminService;
    _providerService = ProviderService;
  }

  async signUp(userBody) {
    const { uniquecode, roles, secretKey } = userBody;
    userBody.enabled = false;
    if (roles.includes(uniquecode)) {
      enabled = true;
      isVerified = true;
    }
    let userExist;
    if (roles.includes("ROLE_OWNER_ACCESS")) {
      validateOwnerAccess(secretKey);
      return await _userService.create({ ...userBody });
    }
    const admin = (userExist = await selectServiceByProperty(
      "uniquecode",
      uniquecode,
      true
    ));
    const { _id, uuid, isVerified } = admin.user;
    if (roles.includes("ROLE_USER_ACCESS")) {
      await _userService.create({
        ...userBody,
        neighborhood: _id,
        admin: { uuid: uuid },
      });
    } else if (roles.includes("ROLE_ADMINISTRATION_ACCESS") && !isVerified) {
      await _adminService.update(userExist.user._id, userBody);
    } else if (roles.includes("ROLE_PROVIDER_ACCESS")) {
      await _providerService.create(userBody);
    } else createError(400, "User already exist");
    return await selectServiceByProperty("email", userBody.email, true);
  }

  async signIn(userInfo, singUp = false) {
    const { email, password, secretKey } = userInfo;
    const { propName, value } = getUsernameOrEmail(email);
    const { user } = await selectServiceByProperty(propName, value, singUp);

    let token;
    if (user) {
      const validPassword = user.comparePasswords(password);
      if (!validPassword) createError(401, "Invalid Password");

      if (user.roles.includes("ROLE_USER_ACCESS") && validPassword) {
        const userToEncode = {
          username: user.email,
          uuid: user?.uuid,
          roles: user?.roles,
          phone: user?.phone,
        };
        token = generateToken(userToEncode);
      }
      if (user.roles.includes("ROLE_OWNER_ACCESS") && validPassword) {
        if (secretKey != SECRET_OWNER) createError(400, "Invalid secretKey");
      }
    }
    if (!token) createError(400, "Invalid username or password");

    return {
      token,
      user: {
        username: user.email,
        firstName: user.firstName,
        lastName: user?.lastName,
        propertyInfo: user?.propertyInfo,
        cityName: user?.cityName,
        admin: user?.admin,
        roles: user?.roles,
      },
    };
  }

  async recover(body) {
    const { propName, value } = getUsernameOrEmail(body.email);

    const { user } = await selectServiceByProperty(propName, value);

    if (!user) {
      throw createError(
        404,
        "The email address is not associated with any account. Double-check your email address and try again."
      );
    }

    user.generatePasswordReset();
    const newUser = await user.save();

    if (!newUser) {
      throw createError(
        500,
        "No fue posible generar el token intente nuevamente"
      );
    }

    const emailResult = await sendPasswordEmail(user, "reset");

    return {
      message: "Password change request",
      emailResult,
    };
  }

  async reset(token) {
    const { user } = await selectServiceByProperty("resetPasswordToken", token);
    if (!user) {
      throw createError(
        500,
        "El restablecimiento de contraseña no es válido o ha expirado."
      );
    }
    return {
      username: user.username,
      email: user.email,
    };
  }

  async resetPassword(token, body) {
    const { user } = await selectServiceByProperty("resetPasswordToken", token);

    if (!user) {
      throw createError(500, "Password reset token is invalid or has expired.");
    }
    //Set the new password
    user.password = body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    // Save
    const newUser = await user.save();
    if (!newUser) {
      throw createError(500, "No se pudo actualizar la contraseña");
    }
    const emailResult = await sendPasswordEmail(user, "changed");
    return {
      ...{ message: "Your password has been changed" },
      ...{ emailResult },
    };
  }

  async verifyEmail(email) {
    const { user } = await selectServiceByProperty("email", email, true);
    if (!user) {
      throw createError(
        500,
        "The email address is not associated with any account. Double-check your email address and try again."
      );
    }
    //Generate and set password reset token
    user.generatePasswordReset();
    // Save the updated user object
    const newUser = await user.save();
    if (!newUser)
      throw createError(
        500,
        "No fue posible verificar su cuenta intente nuevamente"
      );

    const emailResult = await sendPasswordEmail(user, "verify");

    return {
      ...{ message: "Verify Account" },
      ...{ email: { emailResult } },
    };
  }

  async verify(token) {
    const { user } = await selectServiceByProperty(
      "resetPasswordToken",
      token
    );
    if (!user) createError(500, "Verify token is invalid or has expired.");
    if (!user.isVerified) {
      user.enabled = true;
    }
    //Set the new values
    user.isVerified = true;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    // Save
    const userNew = user.save();

    if (!userNew) throw createError(500, "No se pudo verificar su cuenta");

    const emailResult = await sendPasswordEmail(user, "verified");
    return { message: "Verificacion completa", ...emailResult };
  }

  async signInAndUpdate(loginUser) {
    let { user } = await selectServiceByProperty(
      "email",
      loginUser.email,
      true
    );
    //Set the new values
    user.enabled = true;
    user.isVerified = true;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    // Save
    userUpdated = await user.save();
    delete userUpdated.password;
    if (!userUpdated) throw createError(500, "No se pudo verificar su cuenta");
    return userUpdated;
  }
}

// private functions
async function selectServiceByProperty(propName, value, signUp = false) {
  const user = await _userService.getUserByProperty(propName, value);
  const admin = await _adminService.getAdminByProperty(propName, value);
  const provider = await _providerService.getProviderByProperty(
    propName,
    value
  );

  let _user = user || admin || provider;
  let _service = _userService || _adminService || _providerService;
  const result = { service: _service, user: _user };
  if (!signUp && !_user) {
    createError(404, "User not found");
  }

  if (!_user?.isVerified && signUp) {
    await _user.generatePasswordReset();
    _user.enabled = true;
    await _user.save();
    const emailResult = await sendPasswordEmail(_user, "verify");
    return {
      message: "Verify account email",
      emailResult: { emailResult },
      ...result,
    };
  }
  if (!_user?.enabled && !signUp) createError(400, "User disabled");

  return result;
}

function getUsernameOrEmail(input) {
  if (input && input?.includes("@")) {
    return { propName: "email", value: input };
  }
  return { propName: "username", value: input };
}

function createError(status, message) {
  const error = new Error();
  error.status = status;
  error.message = message;
  throw error;
}

async function sendPasswordEmail(user, emailType) {
  let subject, template, templateData;

  if (emailType === "reset") {
    subject = "Solitud de cambio de contraseña";
    template = "../public/pages/changePasswordNotification.html";
    templateData = {
      NAME: user.firstName,
      RESET_URL: `${FRONT_END_URL}/reset/${user.resetPasswordToken}`,
      USERNAME: user.username,
    };
  } else if (emailType === "changed") {
    subject = "Your password has been changed";
    template = "../public/pages/changePasswordConfirmation.html";
    templateData = {
      EMAIL: user.email,
      FRONT_END_URL: FRONT_END_URL,
      NAME: user.firstName,
    };
  } else if (emailType === "verify") {
    subject = "Por favor verifique su cuenta Vecino";
    template = "../public/pages/verifyemail.html";
    templateData = {
      VERIFY_LINK: `${FRONT_END_URL}/verify/${user.resetPasswordToken}`,
    };
  } else if (emailType === "verified") {
    subject = "Tu cuenta ha sido verificada";
    template = "../public/pages/changeconfirmation.html";
    templateData = {
      NAME: user.firstName,
      user: {
        email: user.email,
      },
      FRONT_END_URL: FRONT_END_URL,
    };
  } else {
    throw new Error("Invalid emailType provided.");
  }

  return await sendEmail(user, subject, "", template, templateData);
}

async function validateOwnerAccess(secretKey) {
  if (!secretKey) {
    throw createError(400, "For owner role, secretKey must be sent");
  }

  if (secretKey !== SECRET_OWNER) {
    throw createError(400, "Invalid secretKey");
  }
}

module.exports = AuthService;
