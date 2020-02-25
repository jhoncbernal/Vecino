const BaseRepository=require('./base.repository')
let _vehicle=null;
class VehicleRepository extends BaseRepository{
constructor({Vehicle}){
    super(Vehicle);
    _vehicle=Vehicle;
}
async getUserByVehicleByPlate(plate){
    return await _vehicle.findOne({'plate':plate});
}
async getUserByVehicleByusername(username){
    return await _vehicle.find({username});
}
async getFavoritePosition(favoriteposition){
    return await _vehicle.findOne({"favoriteposition":favoriteposition});
}
}
module.exports=VehicleRepository;