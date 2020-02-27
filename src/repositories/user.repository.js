const BaseRepository = require('./base.repository');
const {sendEmail} = require('../helpers');
let _user = null;
class UserRepository extends BaseRepository {
    constructor({ User }) {
        super(User);
        _user = User;
    }
    async getUserByUsername(username) {
        return await _user.findOne({ username });
    }
    async getUsersByPoints(propName, value, pageSize = 5, pageNum = 1, ) {
        const skips = pageSize * (pageNum - 1);
        return await _user
            .find({ $query: { [propName]: value } })
            .sort('points')
            .skip(skips)
            .limit(pageSize);
    }
    
    async recover(body, host) {
        try {
            return await _user.findOne({ email: body.email })
                .then(user => {
                    if (!user) {
                        const err = new Error();
                        err.status = 401;
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
                        ( '../public/pages/recoverypassword.html'))
                        .then((result) => {
                            return { ...{"message":"Password change request"},... { "email":{result} } };
                        }).catch((error) => {
                            throw error;
                        })
                })
                .catch((error) => {
                    throw error
                });

        } catch (error) {
            const err = new Error();
            err.status = 500;
            err.message = error.message;
            throw err;
        }
    }
    async reset(token) {
        return await _user.findOne({ resetPasswordToken: token, resetPasswordExpires: { $gt: Date.now() } })
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
    };

    async resetPassword(token, body) {
        return await _user.findOne({ resetPasswordToken: token, resetPasswordExpires: { $gt: Date.now() } })
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
              let  date =Math.floor(Date.now() / 1000);
                return sendEmail(user,
                    "Your password has been changed",`
                    El dia de hoy, se realizo exitosamente el cambio de contraseña a cuenta registrada con el email ${user.email} `,
                    ( '../public/pages/passwordreset.html'))
                    .then((result) => {
                        return { ...{"message":"Your password has been changed"},... { "email":{result} } };
                    }).catch((error) => {
                        throw error;
                    })
            })
            .catch((error) => {
                throw error
            });
    }

}


module.exports = UserRepository;