var mongoose = require("mongoose");
const BaseRepository = require("./base.repository");
let _parkingspace,
  _positions = null;
class ParkingSpaceRepository extends BaseRepository {
  constructor({ ParkingSpace, Positions }) {
    super(ParkingSpace, Positions);
    (_parkingspace = ParkingSpace), (_positions = Positions);
  }
  async getAllParkingPositionEmptySpaceByVehicleType(
    parkingspaceId,
    vehicletype,
    available
  ) {
    return await _parkingspace.aggregate([
      {
        $match: {
          $and: [
            { _id: mongoose.Types.ObjectId(parkingspaceId) },
            { "positions.available": available },
            { "positions.vehicletype": vehicletype },
          ],
        },
      },
      {
        $project: {
          parkingname: 1,
          totalspace: 1,
          positions: {
            $filter: {
              input: "$positions",
              as: "positions",
              cond: {
                $and: [
                  { $eq: ["$$positions.vehicletype", vehicletype] },
                  { $eq: ["$$positions.available", available] },
                ],
              },
            },
          },
          NumberOfCreatePositions: { $size: "$positions" },
        },
      },
      {
        $group: {
          _id: {
            parkingname: "$parkingname",
            totalspace: "$totalspace",
            positions: "$positions",
            NumberOfCreatePositions: "$NumberOfCreatePositions",
            NumberOfPosAvailables: { $size: "$positions" },
          },
        },
      },
    ]);
  }
  async getParkingPositionByPosNumber(parkingspaceId, positionNumber) {
    return await _parkingspace.findOne(
      {
        _id: parkingspaceId,
        positions: {
          $elemMatch: {
            posnumber: positionNumber,
          },
        },
      },
      { parkingname: 1, "positions.$": 1 }
    );
  }
  async updateParkingPositionByPosnumber(parkingspaceId, positionnumber, body) {
    let message = null;
    if (!body.vehicle) {
      body.vehicle = null;
      body.available = true;
      message = `the position: ${positionnumber} now is available`;
    } else {
      body.available = false;
      message = `the position: ${positionnumber} was occupied by the vehicle : ${body.plate} now not available`;
    }
    return await new Promise((resolve, reject) => {
      _parkingspace
        .findOneAndUpdate(
          {
            _id: parkingspaceId,
            positions: {
              $elemMatch: {
                posnumber: positionnumber,
              },
            },
          },
          {
            $set: {
              "positions.$.available": body.available,
              "positions.$.vehicle": body.vehicle,
            },
          },
          {
            select: {
              positions: {
                $elemMatch: {
                  posnumber: positionnumber,
                },
              },
            },
            new: true,
          },
          function (err, result) {
            if (err) reject(err);
            resolve({ ...{ status: message }, ...{ result } });
          }
        )
        .catch((error) => {
          reject(error);
        });
    });
  }
  async deleteParkingPositionByPosnumber(parkingspaceId, positionnumber) {
    return await new Promise((resolve, reject) => {
      _parkingspace.findOneAndUpdate(
        {
          _id: parkingspaceId,
          positions: {
            $elemMatch: {
              posnumber: positionnumber,
            },
          },
        },
        {
          $pull: {
            positions: {
              posnumber: positionnumber,
            },
          },
        },
        { new: true },
        function (err, result) {
          if (err) reject(err);
          resolve(result.positions);
        }
      );
    });
  }
  async getParkingSpaceByname(parkingname, adminId) {
    return await _parkingspace.findOne({
      parkingname: parkingname,
      neighborhood: adminId,
    });
  }
  async createParkingPositions(parkingspaceId, body) {
    const parkingspace = await _parkingspace.findOne({ _id: parkingspaceId });
    const newposition = await _positions.create({
      posnumber: body.posnumber,
      available: body.available,
      vehicletype: body.vehicletype,
    });
    return await new Promise((resolve, reject) => {
      parkingspace.positions.push(newposition);
      parkingspace.save(function (err) {
        if (!err) {
          resolve({ status: "created", ...newposition._doc });
        }
        if (err) {
          reject(err);
        }
      });
    });
  }
}
module.exports = ParkingSpaceRepository;
