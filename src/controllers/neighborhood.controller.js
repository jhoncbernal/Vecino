let _neighborhoodService=null;
class NeighborhoodController{
constructor({NeighborhoodService}) {
    _neighborhoodService=NeighborhoodService;
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
    const createdNeighborhood = await _neighborhoodService.create(body);
    return res.send(createdNeighborhood);
}

}
module.exports=NeighborhoodController