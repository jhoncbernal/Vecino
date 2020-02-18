let _authService =null

class AuthController{
constructor({AuthService}) {
    _authService=AuthService;
}
async signUp(req,res){
    const {body}=req;
    const createdUser= await _authService.signUp(body)
    return res.status(200).send(createdUser);
}
async signIn(req,res){
    const {body}=req;   
    const creds= await _authService.signIn(body)
    return res.status(200).send(creds);
}

async signUpNeighborhood(req,res){
    const {body}=req;
    const createdNeighborhood= await _authService.signUpNeighborhood(body)
    return res.status(200).send(createdNeighborhood);
}
async signInNeighborhood(req,res){
    const {body}=req;   
    const creds= await _authService.signInNeighborhood(body)
    return res.status(200).send(creds);
}
}
module.exports=AuthController;