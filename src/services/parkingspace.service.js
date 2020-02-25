const BaseService = require('./base.service')
let _parkingspaceRepository = null;

class ParkinSpaceService extends BaseService {
    constructor({ ParkingSpaceRepository }) {
        super(ParkingSpaceRepository);
        _parkingspaceRepository = ParkingSpaceRepository;
    }
    async getAllParkingPositionEmptySpaceByVehicleType(parkingspaceId, vehicletype, available) {
        return await _parkingspaceRepository.getAllParkingPositionEmptySpaceByVehicleType(parkingspaceId, vehicletype, available);
    }
    async getParkingPositionByPosNumber(parkingspaceId, positionnumber) {
        return await _parkingspaceRepository.getParkingPositionByPosNumber(parkingspaceId, positionnumber);
    }

    async getParkingSpaceByname(parkingname, neighborhoodId) {
        return await _parkingspaceRepository.getParkingSpaceByname(parkingname, neighborhoodId);
    }
    async updateParkingPositionByPosnumber(parkingspaceId, positionnumber, body) {
        if (!parkingspaceId || !positionnumber) {
            const error = new Error();
            error.status = 400;
            error.message = "parkingspaceId and positionnumber must be sent";
            throw error;
        }
        return await _parkingspaceRepository.updateParkingPositionByPosnumber(parkingspaceId, positionnumber, body);
    }
    async deleteParkingPositionByPosnumber(parkingspaceId, positionnumber) {
        return await _parkingspaceRepository.deleteParkingPositionByPosnumber(parkingspaceId, positionnumber);
    }
    async createParkingPositions(parkingspaceId, body) {
        return await _parkingspaceRepository.createParkingPositions(parkingspaceId, body);
    }
}
module.exports = ParkinSpaceService;