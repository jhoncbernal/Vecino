let _neighborhoodService,_authService=null;
class NeighborhoodController{
constructor({NeighborhoodService,AuthService}) {
    _neighborhoodService=NeighborhoodService;
    _authService=AuthService;
}
async get(req,res){
    const{neighborhoodId}=req.params;
    const neighborhood = await _neighborhoodService.get(neighborhoodId);
    return res.send(neighborhood);
}
async getAll(req,res){
    const {pageSize,pageNum}=req.query;
    const neighborhoods = await _neighborhoodService.getAll("neighborhoodcode",{ $exists: true },pageSize,pageNum);
    return res.send(neighborhoods);
}
async update(req,res){
    const{body}=req;
    const{neighborhoodId}=req.params;
    
    if(body.neighborhoodcode){
        delete body.neighborhoodcode;
    }
    if(body.totalNumberOfUsers){
        delete body.totalNumberOfUsers;
    }
    const updateNeighborhood = await _neighborhoodService.update(neighborhoodId,body);
    return res.send(updateNeighborhood);
}
async delete(req,res){
    const{neighborhoodId}=req.params;
    const deleteNeighborhood= await _neighborhoodService.delete(neighborhoodId);
    return res.send(deleteNeighborhood);
}
async create(req,res){
    const{body}=req;
    const { baseUrl } = req;
    let host = req.headers.host + baseUrl;
    if(host.includes('neighborhood')){
        host=  host.replace('neighborhood','auth');
      }
    await _neighborhoodService.create(body).then((userService) => {
        return _authService.verifyEmail(userService, host)
            .then((sendVerifyUser) => {
                return res.status(200).send({ userService, ...{ "emailResult": sendVerifyUser } });
            }).catch((error) => {
                return res.status(500).send({ userService, ...{ "emailResult": error.message } });
            });
    }).catch((error) => {
        return res.status(500).send({ "error": error.message });
    });
}
async getAllNames(req,res){
    const {pageSize,pageNum}=req.query;
    const neighborhoods = await _neighborhoodService.getAllNeighborhoodNames(pageSize,pageNum);
    return res.send(neighborhoods);
}

}
module.exports=NeighborhoodController