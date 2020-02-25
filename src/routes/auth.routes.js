const {Router}= require('express');

module.exports=function({AuthController}){
const router=Router();

router.post('/signup',AuthController.signUp);
router.post('/signin',AuthController.signIn);
router.post('/signupneighborhood',AuthController.signUpNeighborhood);
router.post('/signinneighborhood',AuthController.signInNeighborhood);

router.post('/recover',AuthController.recover);
router.get('/reset/:token',AuthController.reset);
router.post('/reset/:token',AuthController.resetPassword);
return router;
}