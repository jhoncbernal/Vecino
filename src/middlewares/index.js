module.exports={
    NotFoundMiddleware :require("./not-found.middleware"),
    ErrorMiddleware :require('./error.middleware'),
    AuthMiddleware :require('./auth.middleware'),
    ParseIntMiddleware:require('./parse-int.middleware'),
    HasPermissionMiddleware:require('./hasPermission.middleware')
}