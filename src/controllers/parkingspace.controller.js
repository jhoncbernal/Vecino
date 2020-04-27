let _parkingSpaceService,
  _adminService,
  _vehicleService = null;
class ParkingSpaceController {
  constructor({ ParkingSpaceService, AdminService, VehicleService }) {
    _parkingSpaceService = ParkingSpaceService;
    _adminService = AdminService;
    _vehicleService = VehicleService;
  }

  async get(req, res) {
    const { parkingname } = req.params;
    const { id: adminId } = req.user;
    await _parkingSpaceService
      .getParkingSpaceByname(parkingname, adminId)
      .then((parkingSpace) => {
        if (!parkingSpace) {
          return res.status(404).send({
            message:
              "parkingSpace not found with name " + req.params.parkingname,
          });
        }
        res.send(parkingSpace);
      })
      .catch((err) => {
        if (err.kind === "ObjectId") {
          return res.status(404).send({
            message:
              "parkingSpace not found with name " + req.params.parkingname,
          });
        }
        return res.status(error.status).send({
          message:
            "Error retrieving parkingSpace with name " + req.params.parkingname,
        });
      });
  }

  async getAll(req, res) {
    const { id: adminId } = req.user;
    const { pageSize, pageNum } = req.query;
    const parkingSpace = await _parkingSpaceService.getAll(
      "neighborhood",
      adminId,
      pageSize,
      pageNum
    );
    return res.send(parkingSpace);
  }

  async update(req, res) {
    const { body } = req;
    const { parkingname } = req.params;
    const { id: adminId } = req.user;
    const parking = await _parkingSpaceService.getParkingSpaceByname(
      parkingname,
      adminId
    );

    _parkingSpaceService
      .update(parking._id, body)
      .then((parkingSpace) => {
        if (!parkingSpace) {
          return res.status(404).send({
            message:
              "parkingSpace not found with name " + req.params.parkingname,
          });
        }
        res.send(parkingSpace);
      })
      .catch((err) => {
        if (err.kind === "ObjectId") {
          return res.status(404).send({
            message:
              "parkingSpace not found with name " + req.params.parkingname,
          });
        }
        return res.status(error.status).send({
          message:
            "Error updating parkingSpace with name " + req.params.parkingname,
        });
      });
  }

  async delete(req, res) {
    const { parkingname } = req.params;
    const { id: adminId } = req.user;
    const parking = await _parkingSpaceService.getParkingSpaceByname(
      parkingname,
      adminId
    );

    await _parkingSpaceService
      .delete(parking._id)
      .then((parkingSpace) => {
        if (!parkingSpace) {
          return res.status(404).send({
            message:
              "parkingSpace not found with id " + req.params.parkingSpaced,
          });
        }
        res.send({ message: "parkingSpace deleted successfully!" });
      })
      .catch((err) => {
        if (err.kind === "ObjectId" || err.name === "NotFound") {
          return res.status(404).send({
            message:
              "parkingSpace not found with name " + req.params.parkingname,
          });
        }
        return res.status(error.status).send({
          message:
            "Could not delete parkingSpace with name " + req.params.parkingname,
        });
      });
  }

  async create(req, res) {
    const { body } = req;
    const { id: adminId } = req.user;
    body.neighborhood = adminId;
    const parkingSpace = await _parkingSpaceService.create(body);
    return res.send(parkingSpace);
  }

  async getAllParkingPositionEmptySpaceByVehicleType(req, res) {
    const { parkingname } = req.params;
    const { id: adminId } = req.user;
    const parking = await _parkingSpaceService.getParkingSpaceByname(
      parkingname,
      adminId
    );

    let { vehicletype = "Car", available = "true" } = req.query;
    const parkingSpace = await _parkingSpaceService.getAllParkingPositionEmptySpaceByVehicleType(
      parking._id,
      vehicletype,
      available
    );
    return res.send(parkingSpace);
  }

  async getParkingPositionByPosNumber(req, res) {
    const { parkingname, positionnumber } = req.params;
    const { id: adminId } = req.user;
    const parking = await _parkingSpaceService.getParkingSpaceByname(
      parkingname,
      adminId
    );

    const parkingSpace = await _parkingSpaceService.getParkingPositionByPosNumber(
      parking._id,
      positionnumber
    );
    return res.send(parkingSpace);
  }

  async updateParkingPositionByPosnumber(req, res) {
    const { parkingname, positionnumber } = req.params;
    const { id: adminId } = req.user;
    const parking = await _parkingSpaceService.getParkingSpaceByname(
      parkingname,
      adminId
    );

    const { body } = req;
    const vehicleExist = await _vehicleService.getUserByVehicleByPlate(
      body.plate
    );
    if (vehicleExist) {
      const posVehicle = await _parkingSpaceService.getAll(
        "positions.vehicle.plate",
        vehicleExist.plate
      );
      if (posVehicle.length != 0) {
        const err = new Error();
        err.status = 500;
        err.message = `the plate is already asigned to other position`;
        throw err;
      }
      body.vehicle = vehicleExist;
    }
    const parkingSpace = await _parkingSpaceService
      .updateParkingPositionByPosnumber(parking._id, positionnumber, body)
      .then((vehicleExist) => {
        if (vehicleExist == null) {
          const err = new Error();
          err.status = 404;
          err.message = `positionnumber or parkingspaceId not found!`;//`positionnumber :${positionnumber} or parkingspaceId: ${parking._id} not found!`;
          throw err;
        }

        return res.status(200).send(vehicleExist);
      });
    return res.send(parkingSpace);
  }

  async deleteParkingPositionByPosnumber(req, res) {
    const { parkingname, positionnumber } = req.params;
    const { id: adminId } = req.user;
    const parking = await _parkingSpaceService.getParkingSpaceByname(
      parkingname,
      adminId
    );

    return _parkingSpaceService
      .deleteParkingPositionByPosnumber(parking._id, positionnumber)
      .then((parkingSpace) => {
        if (parkingSpace == null) {
          const err = new Error();
          err.status = 404;
          err.message =`positionnumber or parkingspaceId not found!`; //`positionnumber :${positionnumber} or parkingspaceId: ${parking._id} not found!`;
          throw err;
        }

        return res.status(200).send(parkingSpace);
      });
  }

  async createParkingPositions(req, res) {
    const { body } = req;
    const { parkingname } = req.params;
    const { id: adminId } = req.user;
    const parking = await _parkingSpaceService.getParkingSpaceByname(
      parkingname,
      adminId
    );

    const parkingSpace = await _parkingSpaceService.createParkingPositions(
      parking._id,
      body
    );
    return res.send(parkingSpace);
  }
}

module.exports = ParkingSpaceController;
