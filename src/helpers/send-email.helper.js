import { config as _config, SES } from "aws-sdk";
import { compile } from "handlebars";
import { readFile } from "fs";
import { join } from "path";
import { FROM_EMAIL, AWSREGION, AWSSECRETACCESSKEY, AWSACCESSKEYID } from "../config";
import { APPLICATION_NAME, PROJECT } from "../config";
_config.update({
  accessKeyId: AWSACCESSKEYID,
  secretAccessKey: AWSSECRETACCESSKEY,
  region: AWSREGION,
});
const ses = new SES({ region: AWSREGION });

async function readHTMLFile(path, callback) {
  readFile(path, { encoding: "utf-8" }, function (err, html) {
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
      readHTMLFile(join(__dirname, htmlpath), function (err, html) {
        var template = compile(html);

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

async function sendEmail(
  user,
  subject,
  text,
  htmlpath,
  objectReplacement = {}
) {
  try {
    htmlToSend = await new Promise((resolve, reject) => {
      readHTMLFile(join(__dirname, htmlpath), function (err, html) {
        var template = compile(html);
        var replacements = {
          username: user.firstName,
          link: text,
          APP_NAME: APPLICATION_NAME,
        };
        if (err) {
          reject(err);
        } else {
          resolve(template({ ...replacements, ...objectReplacement }));
        }
      });
    });
    const recipientsArr = user.email.includes(",")
      ? user.email.split(",")
      : [user.email];
    const mailOptions = {
      Destination: {
        ToAddresses: recipientsArr,
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
   if (PROJECT.mode === "development") return { email: "OK" }; 
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

export default { sendEmail, HTMLReplace };
