const BaseService = require('./base.service')
let _vehicleRepository = null;

class VehicleService extends BaseService {
    constructor({ VehicleRepository}) {
        super(VehicleRepository);
        _vehicleRepository = VehicleRepository;
    }
    async getUserByVehicleByPlate(plate){
        return await _vehicleRepository.getUserByVehicleByPlate(plate);
    }
    async getUserByVehicleByusername(username){
        return await _vehicleRepository.getUserByVehicleByusername(username);
    }
}
module.exports = VehicleService;