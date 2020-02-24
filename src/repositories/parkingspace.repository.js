var mongoose = require('mongoose');
const BaseRepository = require('./base.repository');
let _parkingspace = null;
class ParkingSpaceRepository extends BaseRepository {
    constructor({ ParkingSpace }) {
        super(ParkingSpace);
        _parkingspace = ParkingSpace;
    }
    async getAllParkingPositionEmptySpaceByVehicleType(parkingspaceId, vehicletype,available) {
        return await _parkingspace.aggregate([
            {
                $match: {
                    $and:
                        [
                            { "_id": mongoose.Types.ObjectId(parkingspaceId) },
                            { 'position.available': available },
                            { 'position.vehicletype': vehicletype }
                        ]

                }
            },
            {
                $project:
                {
                    positions:
                    {
                        $filter: {
                            input: '$position',
                            as: 'positions',
                            cond:
                            {
                                $and: 
                                [
                                    { $eq: ['$$positions.vehicletype', vehicletype] },
                                    { $eq: ['$$positions.available', available] }
                                ]
                            }
                        }
                    }
                }
            }
        ]);
        //.find({"_id": parkingspaceId},{position: {$elemMatch: {available:'true'}}});
    }
    async getParkingPositionByPosId(parkingspaceId) {
        return await _parkingspace.findOne({ 'position.posnumber': "5e5163b70d7e94f2ef140704", 'neighborhood': neighborhoodId });
    };
    async getParkingPositionByPosId(parkingspaceId, body) {
        return await _parkingspace.update(parkingspaceId, body);
    }
    async updateParkingPositionByPosId(positionId) {
        return await _parkingspace.delete(positionId);
    }
    async deleteParkingPositionByPosId(parkingspaceId, body) {
        let parkingspace = await _parkingspace.find({ parkingspaceId });
        parkingspace.position.push(body);
        return await _parkingspace.update(parkingspaceId, parkingspace.position.push(body));
    }
    async getParkingSpaceByname(parkingname, neighborhoodId) {
        return await _parkingspace.findOne({ "parkingname": parkingname, "neighborhood": neighborhoodId });
    }
}
module.exports = ParkingSpaceRepository;