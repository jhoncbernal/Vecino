const BaseService = require("./base.service");
const { FRONT } = require("../config");
const { sendEmail } = require("../helpers");
let _filerepository,
  _userRepository = null;

class FileService extends BaseService {
  constructor({ FileRepository, UserRepository }) {
    super(FileRepository);
    _filerepository = FileRepository;
    _userRepository = UserRepository;
  }

  async uploadFilePortfolioUsers(portfoliodata) {
    return await _filerepository.uploadFilePortfolioUsers(portfoliodata);
  }

  async uploadFileUsers(usersData) {
    const emails = await _filerepository
      .uploadFileUsers(usersData)
      .then(async (users) => {
        return await Promise.all(
          users.map(async (user) => {
            try {
              const userExist = await _userRepository
                .getUserByProperty("documentId", user.Identificacion)
                .then((res) => {
                  return res;
                })
                .catch((e) => {
                  console.error(e);
                });
              let userEmail = {
                firstName: "",
                email: "",
                title: "",
                message: "",
                pathPage: "",
                fileId: user._id,
              };

              if (userExist) {
                if (!userExist.roles.includes(user.Uniquecode)) {
                  await _userRepository
                    .addNewUserRole(userExist._id, user.Uniquecode)
                    .then((res) => {
                      return res;
                    })
                    .catch((e) => {
                      console.error(e);
                    });

                  userEmail.firstName = userExist.firstName;
                  userEmail.email = userExist.email;
                  userEmail.title = `Tu cuenta fue asociada a su conjunto ${
                    userExist.uniquecode === user.Uniquecode
                      ? userExist.neighborhood.firstName
                      : ''
                  }`;
                  userEmail.message = `
                    Se realizó exitosamente la verificación de la cuenta registrada con el email ${
                      userExist.email
                    } a su conjunto ${
                    userExist.uniquecode === user.Uniquecode
                      ? userExist.neighborhood.firstName
                      : ''
                  }`;
                  userEmail.pathPage =
                    "../public/pages/changeconfirmation.html";
                }else{
                  return
                }
              } else {
                userEmail.firstName = user.Nombres;
                userEmail.email = user.Correo;
                userEmail.title = "Estas a un paso para usar tu cuenta Vecino";
                userEmail.message = `${FRONT}/signup/${user.Identificacion}`;
                userEmail.pathPage = "../public/pages/verifyemail.html";
              }
              return userEmail;
            } catch (e) {
              console.error(e);
            }
          })
        )
          .then(async (results) => {
            return results;
          })
          .catch((err) => {
            throw err;
          });
      })
      .catch((error) => {
        throw error;
      });
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    const sendEmails = async(email) => {
        if (email) {
          return await sendEmail(email, email.title, email.message, email.pathPage)
           
        }
      }
    return emails.reduce(function (promise, item) {
      return promise.then(function (result) {
        return Promise.all([delay(10), sendEmails(item)]);
      }).catch(console.error);
    }, Promise.resolve());
  }

  async uploadFileImage() {
    if (!req.files) {
      return res.status(400).send("No images were uploaded.");
    }
    AWS.config.update({
      secretAccessKey: AWSSECRETACCESSKEY,
      accessKeyId: AWSACCESSKEYID,
      region: AWSREGION,
    });
    var s3 = new AWS.S3();
    var myBucket = AWSBUCKETIMG;

    var myKey = `${new Date().toISOString()}-${req.files.image.name}`;

    let params = {
      Bucket: myBucket,
      Key: myKey,
      Body: req.files.image.data,
      ContentEncoding: "base64",
      ContentType: "image/png",
      ACL: "public-read",
    };

    s3.upload(params, function (err, data) {
      if (err) {
        console.error(err);
        res.status(200).send(err);
      } else {
        console.error("Successfully uploaded data to myBucket/myKey");
        res.status(200).send(data);
      }
    });
  }
  async getUserByDocumentId(documentId) {
    return await _filerepository.getUserByDocumentId(documentId);
  }
}
function delay(t, data) {
  return new Promise((resolve) => {
    setTimeout(resolve.bind(null, data), t);
  });
}
module.exports = FileService;
