const BaseService = require('./base.service')
let _parkingspaceRepository = null;

class ParkinSpaceService extends BaseService {
    constructor({ ParkingSpaceRepository}) {
        super(ParkingSpaceRepository);
        _parkingspaceRepository = ParkingSpaceRepository;
    }
    async getAllParkingPositionEmptySpaceByVehicleType(parkingspaceId,vehicletype,available){
        return await _parkingspaceRepository.getAllParkingPositionEmptySpaceByVehicleType(parkingspaceId,vehicletype,available);
    }
    async getParkingPositionByPosId(parkingspaceId,positionId){
        return await _parkingspaceRepository.getParkingPositionByPosgetParkingPositionByPosIdnumber(parkingspaceId,positionId);
    } 
    async getParkingSpaceByname(parkingname,neighborhoodId){
        return await _parkingspaceRepository.getParkingSpaceByname(parkingname,neighborhoodId);
    }
    async updateParkingPositionByPosId(parkingspaceId,positionId,body){
        return await _parkingspaceRepository.updateParkingPositionByPosId(parkingspaceId,positionId,body);
    }
    async deleteParkingPositionByPosId(parkingspaceId,body){
        return await _parkingspaceRepository.deleteParkingPositionByPosId(parkingspaceId,positionId,body);
    }

 
}
module.exports = ParkinSpaceService;