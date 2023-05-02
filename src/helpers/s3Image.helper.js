import { S3Client, PutObjectCommand, DeleteObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import sharp from "sharp";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { AWSSECRETACCESSKEY, AWSREGION, AWSACCESSKEYID, AWSBUCKETIMG } from "../config";
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
    console.log(`Successfully uploaded data to ${AWSBUCKETIMG}/${myKey}`);
    // Generate the URL to access the uploaded image file
    const imageUrl = `https://${AWSBUCKETIMG}.s3.${AWSREGION}.amazonaws.com/${myKey}`;

    return { ...response, Location: imageUrl };
  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function getImageUrl(key) {
  const s3 = new S3Client({
    region: AWSREGION, // Replace "your-bucket-region" with your bucket's region
    credentials: {
      accessKeyId: AWSACCESSKEYID,
      secretAccessKey: AWSSECRETACCESSKEY,
    },
  });
  const command = new GetObjectCommand({
    Bucket: AWSBUCKETIMG,
    Key: key,
  });

  const response = await s3.send(command);

  if (response.$metadata.httpStatusCode === 200) {
    const signedUrl = await getSignedUrl(s3, {
      Bucket: AWSBUCKETIMG,
      Key: key
    });
    return signedUrl;
  } else {
    throw new Error("Error getting object from S3");
  }
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

export default { uploadImage, getImageUrl, deleteImage, listImages };
