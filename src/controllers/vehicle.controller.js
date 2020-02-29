let _vehicleService=null;
let _userService=null;
class VehicleController{
constructor({VehicleService,UserService}) {
    _vehicleService=VehicleService;
    _userService=UserService;
}
async get(req,res){
    const{vehicleId}=req.params;
     await _vehicleService.get(vehicleId).then(vehicle => {
        if(!vehicle) {
            return res.status(404).send({
                message: "vehicle not found with id " + req.params.vehicleId
            });            
        }
        res.send(vehicle);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "vehicle not found with id " + req.params.vehicleId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving vehicle with id " + req.params.vehicleId
        });
    });
}
async getAll(req,res){
    const{id:userId}=req.user;
    const {pageSize,pageNum}=req.query;
    const vehicles = await _vehicleService.getAll('user',userId,pageSize,pageNum);
    return res.send(vehicles);
}
async update(req,res){
    const{body}=req;
    const{vehicleId}=req.params;
    _vehicleService.update(vehicleId,body).then(vehicle => {
        if(!vehicle) {
            return res.status(404).send({
                message: "vehicle not found with id " + req.params.vehicleId
            });
        }
        res.send(vehicle);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "vehicle not found with id " + req.params.vehicleId
            });                
        }
        return res.status(500).send({
            message: "Error updating vehicle with id " + req.params.vehicleId
        });
    });
 
}
async delete(req,res){
    const{vehicleId}=req.params;
    await _vehicleService.delete(vehicleId).then(vehicle => {
        if(!vehicle) {
            return res.status(404).send({
                message: "vehicle not found with id " + req.params.vehicleId
            });
        }
        res.send({message: "vehicle deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "vehicle not found with id " + req.params.vehicleId
            });                
        }
        return res.status(500).send({
            message: "Could not delete vehicle with id " + req.params.vehicleId
        });
    });
}
async create(req,res){
    const {body}=req;
    const{id:userId}=req.user;
    body.user=userId;
    const vehicleExist= await _vehicleService.getUserByVehicleByPlate(body.plate);
    const userExist= await _userService.get(userId);
    if (vehicleExist) {
        const error = new Error();
        error.status = 409;
        error.message = "vehicle already exist";
        throw error;
    }
    body.owner=userExist.id;
    const vehicle= await _vehicleService.create(body);
    return res.send(vehicle);
}

async getUserByVehicleByPlate(req,res){
    const{plate}=req.params;
    const vehicle= await _vehicleService.getUserByVehicleByPlate(plate);
    return res.send(vehicle);
}
async getUserByVehicleByusername(req,res){
    const{username}=req.params;
    const vehicle= await _vehicleService.getUserByVehicleByusername(username);
    return res.send(vehicle);
}
async getFavoritePosition(req,res){
    const{favoriteposition}=req.params;
    const vehicle= _vehicleService.getFavoritePosition(favoriteposition);
    return res.send(vehicle);
}
async createObservation(req,res){
    const {body}=req;
    const{id:userId}=req.user;
    const vehicle= await _vehicleService.create(body);
    return res.send(vehicle);
}

}
module.exports=VehicleController