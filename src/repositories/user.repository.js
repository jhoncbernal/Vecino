const BaseRepository = require('./base.repository');
const nodemailer = require('nodemailer');
var handlebars = require('handlebars');
var fs = require('fs');
var path = require('path'); 
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
                        `http://${host}/v1/api/auth/reset/${user.resetPasswordToken}`,(path.join(__dirname, '../public/pages/recoverypassword.html')))
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
                    "Your password has been changed",`:

                    El dia de hoy, se realizo exitosamente el cambio de contraseña a su cuenta , ${user.email} `,
                    (path.join(__dirname, '../public/pages/passwordreset.html')))
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

async function sendEmail(user, subject, text,htmlpath) {
    var readHTMLFile = function(path, callback) {
        fs.readFile(path, {encoding: 'utf-8'}, function (err, html) {
            if (err) {
                throw err;
                callback(err);
            }
            else {
                callback(null, html);
            }
        });
    };
    
  let mailOptions=  readHTMLFile(htmlpath, function(err, html) {
        var template = handlebars.compile(html);
        var replacements = {
             username: user.firstName+' '+user.lastName,
             link:text
        };
        let htmlToSend = template(replacements);
   
    // send email

   return  mailOptions =
    {
        to: user.email,
        from: FROM_EMAIL,
        subject: subject,
        attachments: [{
            filename: 'logo.svg',
            path: path.join(__dirname, '../public/img/logo.svg'),
            cid: 'unique@kreata.ee' //same cid value as in the html img src
        }],
    
        //text: text,
        html : htmlToSend,
   
    };
});


    return await new Promise((resolve, reject) => {
/*         let transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: FROM_EMAIL,
                pass: PSWD_EMAIL
            } 
        }); */
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