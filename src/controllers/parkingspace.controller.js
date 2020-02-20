let _parkingSpaceService,_neighborhoodService=null;
class ParkingSpaceController{
constructor({ParkingSpaceService,NeighborhoodService}) {
    _parkingSpaceService=ParkingSpaceService;
    _neighborhoodService= NeighborhoodService;
}
async get(req,res){
    const{parkingspaceId}=req.params;
     await _parkingSpaceService.get(parkingspaceId).then(parkingSpace => {
        if(!parkingSpace) {
            return res.status(404).send({
                message: "parkingSpace not found with id " + req.params.parkingspaceId
            });            
        }
        res.send(parkingSpace);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "parkingSpace not found with id " + req.params.parkingspaceId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving parkingSpace with id " + req.params.parkingspaceId
        });
    });
}
async getAll(req,res){
    const{id:neighborhoodId}=req.user;
    const {pageSize,pageNum}=req.query;
    const parkingSpace = await _parkingSpaceService.getAll('neighborhood',neighborhoodId,pageSize,pageNum);
    return res.send(parkingSpace);
}
async update(req,res){
    const{body}=req;
    const{parkingspaceId}=req.params;
    _parkingSpaceService.update(parkingspaceId,body).then(parkingSpace => {
        if(!parkingSpace) {
            return res.status(404).send({
                message: "parkingSpace not found with id " + req.params.parkingspaceId
            });
        }
        res.send(parkingSpace);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "parkingSpace not found with id " + req.params.parkingspaceId
            });                
        }
        return res.status(500).send({
            message: "Error updating parkingSpace with id " + req.params.parkingspaceId
        });
    });
 
}
async delete(req,res){
    const{parkingspaceId}=req.params;
    await _parkingSpaceService.delete(parkingspaceId).then(parkingSpace => {
        if(!parkingSpace) {
            return res.status(404).send({
                message: "parkingSpace not found with id " + req.params.parkingSpaced
            });
        }
        res.send({message: "parkingSpace deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "parkingSpace not found with id " + req.params.parkingspaceId
            });                
        }
        return res.status(500).send({
            message: "Could not delete parkingSpace with id " + req.params.parkingspaceId
        });
    });
}
async create(req,res){
    const{body}=req;
    const{id:neighborhoodId}=req.user;
    body.neighborhood=neighborhoodId;
    const parkingSpace= await _parkingSpaceService.create(body);
    return res.send(parkingSpace);
}

async getEmptySpace(req,res){
    const parkingSpace= await _parkingSpaceService.getEmptySpace();
    return res.send(parkingSpace);
}
async addParkingPosition(req,res){
    const{body}=req;
    const{parkingspaceId}=req.params;
    const parkingSpace= await _parkingSpaceService.addParkingPosition(parkingspaceId,body);
    return res.send(parkingSpace);
}

}

module.exports=ParkingSpaceController