let _vehicleService=null;
class VehicleController{
constructor({VehicleService}) {
    _vehicleService=VehicleService;
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
    const {pageSize,pageNum}=req.query;
    const vehicle = await _vehicleService.getAll(pageSize,pageNum);
    return res.send(vehicle);
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
    const{body}=req;
    const vehicle= await _vehicleService.create(body);
    return res.send(vehicle);
}

async getUserByVehicleByPlate(req,res){
    const{plate}=req.params;
    const deleteVehicle= await _vehicleService.getUserByVehicleByPlate(plate);
    return res.send(vehicle);
}
async getUserByVehicleByusername(req,res){
    const{username}=req.params;
    const vehicle= await _vehicleService.getUserByVehicleByusername(username);
    return res.send(vehicle);
}


}
module.exports=VehicleController