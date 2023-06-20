import bindMethods from "../utils/bindMethods.js";
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
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function getTemplate(path) {
  if (!templates.has(path)) {
    const html = await readFile(path, { encoding: "utf-8" });
    templates.set(path, compile(html));
  }
  return templates.get(path);
}

// AWS SES setup
_config.update({
  accessKeyId: AWSACCESSKEYID,
  secretAccessKey: AWSSECRETACCESSKEY,
  region: AWSREGION,
});

const ses = new SES({ region: AWSREGION });

// Template manager
const templates = new Map();
// Mailer class
class Mailer {
  constructor({ logger, config }) {
    this.logger = logger;
    this.config = config;
    bindMethods(this);
  }
  async sendEmail(recipents, subject, objectReplacement = {}, templateName) {
    try {
      const htmlpath = `../public/pages/${templateName}.html`;
      const csspath = `../public/styles/emails.css`;
      const template = await getTemplate(join(__dirname, htmlpath));
      const css = await readFile(join(__dirname, csspath), {
        encoding: "utf-8",
      });
      const replacements = {
        APP_NAME: APPLICATION_NAME,
        CSS: css,
        ...objectReplacement,
      };
      const htmlToSend = template(replacements);
      const recipientsArr = recipents.includes(",")
        ? recipents.split(",")
        : [recipents];
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
      let info;
      if (this.config.env === "production")
        info = await ses.sendEmail(mailOptions).promise();
      this.logger.info("Email sent", {
        to: recipientsArr,
        subject: subject,
      });
      return info;
    } catch (error) {
      this.logger.error("Error sending email", { error: error.message });
      throw error;
    }
  }
}
export { Mailer };
