const { sendEmail } = require("../../../src/helpers"); // Import the sendEmail function
const path = require("path");

// Mock the necessary dependencies
jest.mock("aws-sdk");
jest.mock("handlebars", () => ({
  compile: jest.fn().mockReturnValue(jest.fn()),
}));
jest.mock("fs", () => ({
  readFileSync: jest.fn().mockReturnValue(""),
}));
jest.mock("@aws-sdk/client-s3");
jest.mock("sharp");
jest.mock("@aws-sdk/s3-request-presigner");
const { readFile } = require("fs/promises");

describe("sendEmail", () => {
  it("should send an email with the correct parameters", async () => {
    const user = {
      firstName: "John",
      email: "jhoncbernal@gmail.com",
    };
    const subject = "Test email";
    const text = "https://example.com";
    const htmlpath = "../public/pages/verifyemail.html";

    const result = await sendEmail(user, subject, text, htmlpath);

    expect(result).toBeDefined();
    expect(result.MessageId).toBeDefined();
    expect(result.ResponseMetadata).toBeDefined();
  });

  it("should throw an error if there is an error sending the email", async () => {
    const user = {
      firstName: "John",
      email: "john@example.com",
    };
    const subject = "Test email";
    const text = "https://example.com";
    const htmlpath = "./templates/test.html";

    const error = new Error("Failed to send email");
    jest
      .spyOn(sendEmail.ses, "sendEmail")
      .mockImplementation((params, callback) => {
        callback(error);
      });

    await expect(sendEmail(user, subject, text, htmlpath)).rejects.toThrow(
      error
    );
  });

  it("should use the correct email template", async () => {
    const user = {
      firstName: "John",
      email: "john@example.com",
    };
    const subject = "Test email";
    const text = "https://example.com";
    const htmlpath = "./templates/test.html";
    const expectedReplacements = {
      username: "John",
      link: "https://example.com",
      APP_NAME: "MyApp",
    };

    await sendEmail(user, subject, text, htmlpath);

    expect(handlebars.compile).toHaveBeenCalledWith(expect.any(String));
    const compiledTemplate = handlebars.compile.mock.results[0].value;
    expect(compiledTemplate).toHaveBeenCalledWith(expectedReplacements);
  });

  it("should read the email template from the correct path", async () => {
    const user = {
      firstName: "John",
      email: "john@example.com",
    };
    const subject = "Test email";
    const text = "https://example.com";
    const htmlpath = "./templates/test.html";

    await sendEmail(user, subject, text, htmlpath);

    expect(fs.readFileSync).toHaveBeenCalledWith(
      path.join(__dirname, htmlpath),
      "utf8"
    );
  });
});
