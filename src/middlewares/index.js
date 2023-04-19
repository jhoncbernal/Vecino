module.exports={
    NotFoundMiddleware :require("./not-found.middleware"),
    ErrorMiddleware :require('./error.middleware'),
    AuthMiddleware :require('./auth.middleware'),
    AuthMiddlewareAdmin :require('./authadmin.middleware'),
    AuthMiddlewareOwner :require('./authowner.middleware'),
    ParseIntMiddleware:require('./parse-int.middleware'),
    CacheMiddleware:require('./cache.middleware'),
    HasPermissionMiddleware:require('./hasPermission.middleware')

}