module.exports={
    jwtHelper:require('./jwt.helper').default,
    CACHE_TIME:require('./cache-time.helper'),
    HTMLReplace:require('./send-email.helper').default.HTMLReplace,
    sendEmail:require('./send-email.helper').default.sendEmail,
    uploadImage:require('./s3Image.helper').default.uploadImage,
    deleteImage:require('./s3Image.helper').default.deleteImage,
}