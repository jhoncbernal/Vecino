const BaseRepository=require('./base.repository')
let _vehicle=null;
class VehicleRepository extends BaseRepository{
constructor({Vehicle}){
    super(Vehicle);
    _vehicle=Vehicle;
}
async getUserByVehicleByPlate(plate){
    return await _vehicle.find({'plate':plate});
}
async getUserByVehicleByusername(username){
    return await _vehicle.find({username});
}
}
module.exports=VehicleRepository;