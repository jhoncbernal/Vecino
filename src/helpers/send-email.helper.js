const nodemailer = require('nodemailer');
var handlebars = require('handlebars');
var fs = require('fs');
var path = require('path');
const { FROM_EMAIL, PSWD_EMAIL } = require('../config');

async function readHTMLFile(path, callback) {
    fs.readFile(path, { encoding: 'utf-8' }, function (err, html) {
        if (err) {
            throw err;
        }
        else {
            callback(null, html);
        }
    });
}
async function sendEmail(user, subject, text, htmlpath, mailtrap = true) {
    try {
        htmlToSend = await new Promise((resolve, reject) => {
            readHTMLFile(path.join(__dirname, htmlpath), function (err, html) {
                var template = handlebars.compile(html);
                var replacements = {
                    username: user.firstName,
                    link: text
                };
                if (err) {
                    reject(err);
                }
                else {
                    resolve(template(replacements));
                }
            });
        });
        const mailOptions =
        {
            to: user.email,
            from: FROM_EMAIL,
            subject: subject,
            html: htmlToSend,
        };

        return await new Promise((resolve, reject) => {
            let transport;
            if (mailtrap) {
                transport = nodemailer.createTransport({
                    host: "smtp.mailtrap.io",
                    port: 2525,
                    auth: {
                        user: "b0852e2e5f728c",
                        pass: "b95b5c331a97f4"
                    }
                });
            } else {
                transport = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: FROM_EMAIL,
                        pass: PSWD_EMAIL
                    }
                });
            }
            transport.verify((error, success) => {

                if (error) {
                    reject(error);
                } else {
                    transport.sendMail(mailOptions, function (err, info) {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(info);
                        }
                    })
                }
            })
        });
    }
    catch (error) {
        throw error
    }
}
module.exports = sendEmail;