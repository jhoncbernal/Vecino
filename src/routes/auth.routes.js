const { Router } = require('express');

module.exports = function ({ AuthController }) {
    const router = Router();

    router.post('/signup', AuthController.signUp);
    router.post('/signin', AuthController.signIn);
    router.post('/signupadmin', AuthController.signUpAdmin);
    router.post('/signinadmin', AuthController.signInAdmin);

    router.post('/recover', AuthController.recover);
    router.get('/reset/:token', AuthController.reset);
    router.post('/reset/:token', AuthController.resetPassword);

    router.post('/verify', AuthController.verifyEmail);
    router.get('/verify/:token', AuthController.verify);
    router.post('/signinUpdate', AuthController.signInAndUpdate);
    return router;
}