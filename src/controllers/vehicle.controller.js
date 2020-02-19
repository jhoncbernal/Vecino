let _vehicleService=null;
class VehicleController{
constructor({VehicleService}) {
    _vehicleService=VehicleService;
}
async get(req,res){
    const{vehicleId}=req.params;
    const vehicle = await _vehicleService.get(vehicleId);
    return res.send(vehicle);
}
async getAll(req,res){
    const {pageSize,pageNum}=req.query;
    const vehicle = await _vehicleService.getAll(pageSize,pageNum);
    return res.send(vehicle);
}
async update(req,res){
    const{body}=req;
    const{vehicleId}=req.params;
    const updateVehicle = await _vehicleService.update(vehicleId,body);
    return res.send(updateVehicle);
}
async delete(req,res){
    const{vehicleId}=req.params;
    const deleteVehicle= await _vehicleService.delete(vehicleId);
    return res.send(deleteVehicle);
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