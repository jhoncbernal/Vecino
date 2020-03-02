let _userService,_neighborhoodService=null;
class UserController{
constructor({UserService,NeighborhoodService}) {
    _userService=UserService;
    _neighborhoodService= NeighborhoodService;
}
async get(req,res){
    const{userId}=req.params;
    const user = await _userService.get(userId);
    return res.send(user);
}
async getAll(req,res){
    const{id:userId}=req.user;
    const {pageSize,pageNum}=req.query;
    const neighborhood = await _neighborhoodService.get(userId);
    const users = await _userService.getAll('neighborhoodcode',neighborhood.neighborhoodcode,pageSize,pageNum);
    return res.send(users);
}
async update(req,res){
    const{body}=req;
    const{userId}=req.params;
    const updateUser = await _userService.update(userId,body);
    return res.send(updateUser);
}
async delete(req,res){
    const{userId}=req.params;
    const deleteUser= await _userService.delete(userId);
    return res.send(deleteUser);
}
async updatePoints(req,res){
    const{body}=req;
    const{userId}=req.params;
    const updateUser = await _userService.updatePoints(userId,body);
    return res.send(updateUser);
}
async getUsersByPoints(req,res){
    const{id:userId}=req.user;
    const {pageSize,pageNum}=req.query;
    const neighborhood = await _neighborhoodService.get(userId).catch((err)=>{
        return res.status(500).send(err);
    });;
     await _userService.getUsersByPoints('neighborhoodcode',neighborhood.neighborhoodcode).catch((err)=>{
        return res.status(500).send(err);
    });
    const users = await _userService.getAll('neighborhoodcode',neighborhood.neighborhoodcode,pageSize,pageNum,"payOnTime").catch((err)=>{
        return res.status(500).send(err);
    });;
    return res.send(users);
}
}
module.exports=UserController