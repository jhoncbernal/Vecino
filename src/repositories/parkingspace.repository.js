const BaseRepository=require('./base.repository')
let _parkingspace=null;
class ParkingSpaceRepository extends BaseRepository{
constructor({ParkingSpace}){
    super(ParkingSpace);
    _parkingspace=ParkingSpace;
}
async getEmptySpace(){
    return await _parkingspace.find({'position.available':true});
}

async addParkingPosition(parkingspaceId,body){
    let parkingspace= _parkingspace.get(parkingspaceId);
    parkingspace.position.push(body);
    return await _parkingspace.update(parkingspaceId,parkingspace.position);
}
}
module.exports=ParkingSpaceRepository;