let _parkingpositionService=null;
let _userService=null;
class ParkingpositionController{
constructor({ParkingpositionService,UserService}) {
    _parkingpositionService=ParkingpositionService;
    _userService=UserService;
}
async get(req,res){
    const{parkingpositionId}=req.params;
     await _parkingpositionService.get(parkingpositionId).then(parkingposition => {
        if(!parkingposition) {
            return res.status(404).send({
                message: "parkingposition not found with id " + req.params.parkingpositionId
            });            
        }
        res.send(parkingposition);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "parkingposition not found with id " + req.params.parkingpositionId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving parkingposition with id " + req.params.parkingpositionId
        });
    });
}
async getAll(req,res){
    const{id:userId}=req.user;
    const {pageSize,pageNum}=req.query;
    const user  = await _userService.get(userId);
    const parkingpositions = await _parkingpositionService.getAll('username',user.username,pageSize,pageNum);
    return res.send(parkingpositions);
}
async update(req,res){
    const{body}=req;
    const{parkingpositionId}=req.params;
    _parkingpositionService.update(parkingpositionId,body).then(parkingposition => {
        if(!parkingposition) {
            return res.status(404).send({
                message: "parkingposition not found with id " + req.params.parkingpositionId
            });
        }
        res.send(parkingposition);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "parkingposition not found with id " + req.params.parkingpositionId
            });                
        }
        return res.status(500).send({
            message: "Error updating parkingposition with id " + req.params.parkingpositionId
        });
    });
 
}
async delete(req,res){
    const{parkingpositionId}=req.params;
    await _parkingpositionService.delete(parkingpositionId).then(parkingposition => {
        if(!parkingposition) {
            return res.status(404).send({
                message: "parkingposition not found with id " + req.params.parkingpositionId
            });
        }
        res.send({message: "parkingposition deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "parkingposition not found with id " + req.params.parkingpositionId
            });                
        }
        return res.status(500).send({
            message: "Could not delete parkingposition with id " + req.params.parkingpositionId
        });
    });
}
async create(req,res){
    const{body}=req;
    const parkingposition= await _parkingpositionService.create(body);
    return res.send(parkingposition);
}

async getUserByParkingpositionByPlate(req,res){
    const{plate}=req.params;
    const parkingposition= await _parkingpositionService.getUserByParkingpositionByPlate(plate);
    return res.send(parkingposition);
}
async getUserByParkingpositionByusername(req,res){
    const{username}=req.params;
    const parkingposition= await _parkingpositionService.getUserByParkingpositionByusername(username);
    return res.send(parkingposition);
}


}
module.exports=ParkingpositionController