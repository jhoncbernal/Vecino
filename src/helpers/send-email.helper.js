const aws = require("aws-sdk");
const handlebars = require("handlebars");
const fs = require("fs");
const path = require("path");
const {
  FROM_EMAIL,
  AWSREGION,
  AWSSECRETACCESSKEY,
  AWSACCESSKEYID,
} = require("../config");
const config = require("../config");
aws.config.update({
  accessKeyId: AWSACCESSKEYID,
  secretAccessKey: AWSSECRETACCESSKEY,
  region: AWSREGION,
});
const ses = new aws.SES({ region: AWSREGION });

async function readHTMLFile(path, callback) {
  fs.readFile(path, { encoding: "utf-8" }, function (err, html) {
    if (err) {
      throw err;
    } else {
      callback(null, html);
    }
  });
}

async function HTMLReplace(htmlpath, replacements) {
  try {
    return (htmlToSend = await new Promise((resolve, reject) => {
      readHTMLFile(path.join(__dirname, htmlpath), function (err, html) {
        var template = handlebars.compile(html);

        if (err) {
          reject(err);
        } else {
          resolve(template(replacements));
        }
      });
    }));
  } catch (err) {
    throw err;
  }
}

async function sendEmail(user, subject, text, htmlpath) {
  try {
    htmlToSend = await new Promise((resolve, reject) => {
      readHTMLFile(path.join(__dirname, htmlpath), function (err, html) {
        var template = handlebars.compile(html);
        var replacements = {
          username: user.firstName,
          link: text,
          APP_NAME:config.APPLICATION_NAME
        };
        if (err) {
          reject(err);
        } else {
          resolve(template(replacements));
        }
      });
    });
    const mailOptions = {
      Destination: {
        ToAddresses: [user.email],
      },
      Message: {
        Body: {
          Html: {
            Data: htmlToSend,
            Charset: "utf-8",
          },
        },
        Subject: {
          Data: subject,
          Charset: "utf-8",
        },
      },
      Source: FROM_EMAIL,
    };
    return true;
    return await new Promise((resolve, reject) => {
      ses.sendEmail(mailOptions, function (err, info) {
        if (err) {
          reject(err);
        } else {
          resolve(info);
        }
      });
    });
  } catch (error) {
    throw error;
  }
}

module.exports = { sendEmail, HTMLReplace };
