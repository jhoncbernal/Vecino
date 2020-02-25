var mongoose = require('mongoose');
const BaseRepository = require('./base.repository');
let _parkingspace = null;
class ParkingSpaceRepository extends BaseRepository {
    constructor({ ParkingSpace, Vehicle }) {
        super(ParkingSpace);
        _parkingspace = ParkingSpace
    }
    async getAllParkingPositionEmptySpaceByVehicleType(parkingspaceId, vehicletype, available) {
        return await _parkingspace.aggregate([
            {
                $match: {
                    $and:
                        [
                            { "_id": mongoose.Types.ObjectId(parkingspaceId) },
                            { 'positions.available': available },
                            { 'positions.vehicletype': vehicletype }
                        ]

                }
            },
            {
                $project:
                {
                    parkingname: 1,
                    totalspace: 1,
                    positions:
                    {
                        $filter: {
                            input: '$positions',
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
                    },
                    NumberOfCreatePositions: { $size: "$positions" }
                }
            },
            {
                $group: {
                    _id: {
                        parkingname: '$parkingname',
                        totalspace: '$totalspace',
                        positions: '$positions',
                        NumberOfCreatePositions: '$NumberOfCreatePositions',
                        NumberOfPosAvailables: { $size: "$positions" }
                    },

                }
            }

        ]);
    }
    async getParkingPositionByPosNumber(parkingspaceId, positionNumber) {
        return await _parkingspace.findOne({
            _id: parkingspaceId, positions: {
                $elemMatch: {
                    posnumber: positionNumber
                }
            }
        },
            { parkingname: 1, "positions.$": 1 });
    }
    async updateParkingPositionByPosnumber(parkingspaceId, positionnumber, body) {
        if (!body.vehicle) {
            body.vehicle = null;
            body.available = true;
        }
        else {
            body.available = false;
        }
        return _parkingspace.findOneAndUpdate({
            _id: parkingspaceId, positions: {
                $elemMatch: {
                    posnumber: positionnumber
                }
            }
        }, {
            $set: {
                'positions.$.available': body.available,
                'positions.$.vehicle': body.vehicle
            }
        }, {
            select: {
                positions: {
                    $elemMatch: {
                        posnumber: positionnumber
                    }
                }
            }
        });
    }
    async deleteParkingPositionByPosnumber(parkingspaceId, positionnumber) {
        return await _parkingspace.update({
            _id: parkingspaceId, positions: {
                $elemMatch: {
                    posnumber: positionnumber
                }
            }
        },{
            $pull: {
                positions:
                {
                    posnumber: positionnumber
                }
            }
        });
    }
    async getParkingSpaceByname(parkingname, neighborhoodId) {
        return await _parkingspace.findOne({ "parkingname": parkingname, "neighborhood": neighborhoodId });
    }
    async createParkingPositions(parkingspaceId, body) {
        return await _parkingspace.update({
            _id: parkingspaceId

        }, {
            $push:
            {
                positions: {
                    "posnumber": body.posnumber,
                    "available": body.available,
                    "vehicletype": body.vehicletype
                }
            }
        });
    }
}
module.exports = ParkingSpaceRepository;