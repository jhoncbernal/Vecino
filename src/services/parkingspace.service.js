const BaseService = require('./base.service')
let _parkingspaceRepository = null;

class ParkinSpaceService extends BaseService {
    constructor({ ParkingSpaceRepository}) {
        super(ParkingSpaceRepository);
        _parkingspaceRepository = ParkingSpaceRepository;
    }
    async getEmptySpace(){
        return await _parkingspaceRepository.getEmptySpace();
    }
    async addParkingPosition(parkingspaceId,body){
        return await _parkingspaceRepository.addParkingPosition(parkingspaceId,body);
    }
}
module.exports = ParkinSpaceService;