module.exports={
    jwtHelper:require('./jwt.helper'),
    CACHE_TIME:require('./cache-time.helper'),
    HTMLReplace:require('./send-email.helper').HTMLReplace,
    sendEmail:require('./send-email.helper').sendEmail,
    uploadImage:require('./s3Image.helper').uploadImage,
}