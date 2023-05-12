import pkgAws from "aws-sdk";
import pkg from "handlebars";
import { readFile } from "fs/promises";
import { join } from "path";
import {
  APPLICATION_NAME,
  FROM_EMAIL,
  AWSREGION,
  AWSSECRETACCESSKEY,
  AWSACCESSKEYID,
} from "../config/index.js";

const { config: _config, SES } = pkgAws;
const { compile } = pkg;


// AWS SES setup
_config.update({
  accessKeyId: AWSACCESSKEYID,
  secretAccessKey: AWSSECRETACCESSKEY,
  region: AWSREGION,
});

const ses = new SES({ region: AWSREGION });

// Template manager
const templates = new Map();

async function getTemplate(path) {
  if (!templates.has(path)) {
    const html = await readFile(path, { encoding: "utf-8" });
    templates.set(path, compile(html));
  }
  return templates.get(path);
}

// Mailer class
class Mailer {
  constructor({ logger }) {
    this.logger = logger;
  }
  async sendEmail(user, subject, text, htmlpath, objectReplacement = {}) {
    try {
      const template = await getTemplate(join(__dirname, htmlpath));
      const replacements = {
        username: user.firstName,
        link: text,
        APP_NAME: APPLICATION_NAME,
        ...objectReplacement,
      };
      const htmlToSend = template(replacements);
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

      const info = await ses.sendEmail(mailOptions).promise();
      logger.info("Email sent", {
        to: recipientsArr,
        subject: subject,
      });
      return info;
    } catch (error) {
      logger.error("Error sending email", { error: error.message });
      throw error;
    }
  }
}

export { Mailer };
