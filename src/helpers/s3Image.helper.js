var AWS = require('aws-sdk');
const sharp = require('sharp');
var { AWSSECRETACCESSKEY, AWSREGION, AWSACCESSKEYID, AWSBUCKETIMG } = require('../config');

async function uploadImage(bufferImage) {

    const roundedCornerResizer =sharp(bufferImage.data);
    const bufferImageResizer= await roundedCornerResizer.jpeg({
        quality: 50,
        chromaSubsampling: '4:2:0'
      }).resize(Math.round(1000 * 0.5));
     
    AWS.config.update({
        secretAccessKey: AWSSECRETACCESSKEY,
        accessKeyId: AWSACCESSKEYID,
        region: AWSREGION
    });
    let s3 = new AWS.S3();
    let myBucket = AWSBUCKETIMG;

    let myKey = `${Date.now()}.jpeg`;
    let params = {
        Bucket: myBucket, Key: myKey, Body: bufferImageResizer,
        ContentType: 'image/jpeg', ACL: 'public-read'
    };
  return await new Promise((resolve, reject) => {
   s3.upload(params, function (err, data) {
        if (err) {
            console.log(err);
            reject(err) ;
        }
        else {
            console.log("Successfully uploaded data to myBucket/myKey");
            resolve(data);
        }
    });
});
}

module.exports = { uploadImage }