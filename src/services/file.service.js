const BaseService = require("./base.service");
let _filerepository = null;

class FileService extends BaseService {
    constructor({ FileRepository}) {
        super(FileRepository);
        _filerepository = FileRepository;
    }

  async uploadFilePortfolioUsers(portfoliodata) {
    return await _filerepository.uploadFilePortfolioUsers(portfoliodata);
  }

  async uploadFileUsers(usersData) {
    return await _filerepository.uploadFileUsers(usersData);
  }
  
  async uploadFileImage() {
    if (!req.files) {
      return res.status(400).send("No images were uploaded.");
    }

    console.log(AWSSECRETACCESSKEY);
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
        console.log(err);
        res.status(200).send(err);
      } else {
        console.log("Successfully uploaded data to myBucket/myKey");
        res.status(200).send(data);
      }
    });
  }
  async getUserByDocumentId(documentId){
    return await _filerepository.getUserByDocumentId(documentId);
}
}
module.exports = FileService;
