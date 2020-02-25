const BaseRepository = require('./base.repository');
const nodemailer = require('nodemailer');
const { FROM_EMAIL, PSWD_EMAIL } = require('../config');
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
                        `Hi ${user.username} \n 
                        Please click on the following link "http://"${host}"/api/auth/reset/${user.resetPasswordToken} to reset your password. \n\n 
                        If you did not request this, please ignore this email and your password will remain unchanged.\n`,)
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
                return sendEmail(user,
                    "Your password has been changed",
                    `Hi ${user.username} \n 
                    This is a confirmation that the password for your account ${user.email} has just been changed.\n`)
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
async function sendEmail(user, subject, text) {

    // send email

    const mailOptions =
    {
        to: user.email,
        from: FROM_EMAIL,
        subject: subject,
        text: text,
    };
    /*let transport = nodemailer.createTransport({
           service: 'gmail',
           auth: {
               user: FROM_EMAIL,
               pass: PSWD_EMAIL
           } 
       });*/

    return await new Promise((resolve, reject) => {
        let transport = nodemailer.createTransport({
            host: "smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "b0852e2e5f728c",
                pass: "b95b5c331a97f4"
            }
        });

        transport.verify((error, success) => {

            if (error) {
                reject(error);
            } else {
                transport.sendMail(mailOptions, function (err, info) {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(info);
                    }
                })
            }
        })
    });
}
module.exports = UserRepository;