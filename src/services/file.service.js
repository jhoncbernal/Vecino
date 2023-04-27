const BaseService = require("./base.service");
const { FRONT_END_URL } = require("../config");
const { sendEmail } = require("../helpers");
const createError = require("../utils/createError");

let _filerepository,
  _userRepository = null;

class FileService extends BaseService {
  constructor({ FileRepository, UserRepository }) {
    super(FileRepository);
    _filerepository = FileRepository;
    _userRepository = UserRepository;
  }

  async uploadFilePortfolioUsers(portfoliodata) {
    const result = await _filerepository.uploadFilePortfolioUsers(
      portfoliodata
    );
    if (!result) {
      createError(400, "Error al subir el archivo");
    }
    return result;
  }

  async uploadFileUsers(usersData, uniquecode) {
    const fileUsers = await _filerepository.uploadFileUsers(usersData);
    if (!fileUsers) createError(400, "Error al subir el archivo");
    const userExtraInfo = await _userRepository.getUserByProperty(
      "uniquecode",
      uniquecode
    );
    if (!userExtraInfo) {
      createError(400, "Error al obtener la información del usuario admin");
    }

    const userEmailsPromises = fileUsers.map(async (fileUser) => {
      try {
        const userByDocId = await _userRepository.getUserByProperty(
          "documentId",
          fileUser.Identificacion
        );
        const userByEmail = await _userRepository.getUserByProperty(
          "email",
          fileUser.Correo
        );
        const userExist = userByDocId || userByEmail;
        if (userExist && userExist.isVerified && userExist.enabled) {
          return null;
        }
        fileUser.Direccion = userExtraInfo.address;
        fileUser.CodigoPostal = userExtraInfo.postalCode;
        fileUser.CodigoUnico = userExtraInfo.uniquecode;
        fileUser.NombreCiudad = userExtraInfo.cityName;
        fileUser.CodigoCiudad = userExtraInfo.cityCode;
        fileUser.CodigoEstado = userExtraInfo.stateCode;
        fileUser.CodigoPais = userExtraInfo.countryCode;
        await fileUser.save();

        
        const userEmail = {
          firstName: userExist ? userExist.firstName : fileUser.Nombres,
          email: userExist ? userExist.email : fileUser.Correo,
          title: "",
          message: "",
          pathPage: "",
        };

        if (userExist) {
          userEmail.title = `Tu Administracion te inscribio en Vecino`;
          userEmail.message = ` la verificación e inscripcion de la cuenta`;
          userEmail.pathPage = "../public/pages/changeconfirmation.html";
        } else {
          userEmail.title = "Tu administracion te inscribio en Vecino";
          userEmail.link = `${FRONT_END_URL}/signup/${fileUser.uuid}`;
          userEmail.pathPage = "../public/pages/verifyemail.html";
        }
        return userEmail;
      } catch (e) {
        console.error(e);
      }
    });

    const userEmails = await Promise.all(userEmailsPromises);

    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    const sendEmails = async (email) => {
      if (email) {
        return await sendEmail(
          email,
          email.title,
          email.message,
          email.pathPage,
          {
            VERIFY_LINK: email.link,
            FRONT_END_URL: FRONT_END_URL,
            MENSAJE: email.message,
            EMAIL: email.email,
            NAME: email.firstName,
          }
        );
      }
    };

    return userEmails.reduce(async (previousPromise, email) => {
      await previousPromise;
      await delay(10);
      return sendEmails(email);
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

  async deleteByDocumentId(documentId) {
    return await _filerepository.deleteByDocumentId(documentId);
  }
}

module.exports = FileService;
