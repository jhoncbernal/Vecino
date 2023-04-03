const {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} = require("@aws-sdk/client-s3");
const sharp = require("sharp");
var {
  AWSSECRETACCESSKEY,
  AWSREGION,
  AWSACCESSKEYID,
  AWSBUCKETIMG,
} = require("../config");
const s3 = new S3Client({
  region: AWSREGION,
  credentials: {
    accessKeyId: AWSACCESSKEYID,
    secretAccessKey: AWSSECRETACCESSKEY,
  },
});
async function uploadImage(bufferImage) {
  const roundedCornerResizer = sharp(bufferImage.data);
  const bufferImageResizer = await roundedCornerResizer
    .jpeg({
      quality: 50,
      chromaSubsampling: "4:2:0",
    })
    .resize(Math.round(1000 * 0.5))
    .toBuffer();

  let myKey = `${Date.now()}.jpeg`;

  const command = new PutObjectCommand({
    Bucket: AWSBUCKETIMG,
    Key: myKey,
    Body: bufferImageResizer,
    ContentType: "image/jpeg",
    ACL: "public-read",
  });

  try {
    const response = await s3.send(command);
    console.log("Successfully uploaded data to myBucket/myKey");
    return response;
  } catch (err) {
    console.log(err);
    throw err;
  }
}


async function getImageUrl(myKey) {
  AWS.config.update({
    credentials: {
      secretAccessKey: AWSSECRETACCESSKEY,
      accessKeyId: AWSACCESSKEYID,
    },
    region: AWSREGION,
  });

  const s3 = new AWS.S3();
  const myBucket = AWSBUCKETIMG;

  const params = {
    Bucket: myBucket,
    Key: myKey,
  };

  const url = await s3.getSignedUrlPromise("getObject", params);
  return url;
}

async function deleteImage(myKey) {
  const command = new DeleteObjectCommand({
    Bucket: AWSBUCKETIMG,
    Key: myKey,
  });

  try {
    const response = await s3.send(command);
    console.log(`Successfully delete data to ${AWSBUCKETIMG}/${myKey}`);
    return response;
  } catch (err) {
    console.log(err);
    throw err;
  }
}


async function listImages() {
  AWS.config.update({
    credentials: {
      secretAccessKey: AWSSECRETACCESSKEY,
      accessKeyId: AWSACCESSKEYID,
    },
    region: AWSREGION,
  });

  const s3 = new AWS.S3();
  const myBucket = AWSBUCKETIMG;

  const params = {
    Bucket: myBucket,
  };

  const data = await s3.listObjectsV2(params).promise();
  const images = data.Contents.map((image) => {
    return {
      key: image.Key,
      lastModified: image.LastModified,
      size: image.Size,
    };
  });
  return images;
}

module.exports = { uploadImage, getImageUrl, deleteImage, listImages };
