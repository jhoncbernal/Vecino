const BaseRepository = require('./base.repository')
let _vehicle, _user = null;
class VehicleRepository extends BaseRepository {
    constructor({ Vehicle, User }) {
        super(Vehicle);
        _vehicle = Vehicle;
        _user = User;
    }
    async getUserByVehicleByPlate(plate) {
        return await _vehicle.findOne({ 'plate': plate });
    }
    async getUserByVehicleByusername(username) {
        return await _vehicle.find({ username });
    }
    async getFavoritePosition(favoriteposition) {
        return await _vehicle.findOne({ "favoriteposition": favoriteposition });
    }
    async getVehicleByPlate(plate, userId) {
        const vehicle = await _vehicle.findOne({ "plate": plate });
        const user = await _user.findOne({ "neighborhood": userId, "_id": vehicle.user });
        if (user) { return vehicle }
        else { throw ("Vehicle is not asociate") }
    }
}
module.exports = VehicleRepository;