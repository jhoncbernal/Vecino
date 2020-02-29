let _parkingSpaceService, _neighborhoodService, _vehicle = null;
class ParkingSpaceController {
    constructor({ ParkingSpaceService, NeighborhoodService, VehicleService }) {
        _parkingSpaceService = ParkingSpaceService;
        _neighborhoodService = NeighborhoodService;
        _vehicle = VehicleService
    }
    async get(req, res) {
        const { parkingspaceId } = req.params;
        await _parkingSpaceService.get(parkingspaceId).then(parkingSpace => {
            if (!parkingSpace) {
                return res.status(404).send({
                    message: "parkingSpace not found with id " + req.params.parkingspaceId
                });
            }
            res.send(parkingSpace);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "parkingSpace not found with id " + req.params.parkingspaceId
                });
            }
            return res.status(500).send({
                message: "Error retrieving parkingSpace with id " + req.params.parkingspaceId
            });
        });
    }
    async getAll(req, res) {
        const { id: neighborhoodId } = req.user;
        const { pageSize, pageNum } = req.query;
        const parkingSpace = await _parkingSpaceService.getAll('neighborhood', neighborhoodId, pageSize, pageNum);
        return res.send(parkingSpace);
    }
    async update(req, res) {
        const { body } = req;
        const { parkingspaceId } = req.params;
        _parkingSpaceService.update(parkingspaceId, body).then(parkingSpace => {
            if (!parkingSpace) {
                return res.status(404).send({
                    message: "parkingSpace not found with id " + req.params.parkingspaceId
                });
            }
            res.send(parkingSpace);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "parkingSpace not found with id " + req.params.parkingspaceId
                });
            }
            return res.status(500).send({
                message: "Error updating parkingSpace with id " + req.params.parkingspaceId
            });
        });

    }
    async delete(req, res) {
        const { parkingspaceId } = req.params;
        await _parkingSpaceService.delete(parkingspaceId).then(parkingSpace => {
            if (!parkingSpace) {
                return res.status(404).send({
                    message: "parkingSpace not found with id " + req.params.parkingSpaced
                });
            }
            res.send({ message: "parkingSpace deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "parkingSpace not found with id " + req.params.parkingspaceId
                });
            }
            return res.status(500).send({
                message: "Could not delete parkingSpace with id " + req.params.parkingspaceId
            });
        });
    }
    async create(req, res) {
        const { body } = req;
        const { id: neighborhoodId } = req.user;
        body.neighborhood = neighborhoodId;
        const parkingSpace = await _parkingSpaceService.create(body);
        return res.send(parkingSpace);
    }
    async getAllParkingPositionEmptySpaceByVehicleType(req, res) {
        const { parkingspaceId } = req.params;
        let { vehicletype = "Car", available = "true" } = req.query;
        const parkingSpace = await _parkingSpaceService.getAllParkingPositionEmptySpaceByVehicleType(parkingspaceId, vehicletype, available);
        return res.send(parkingSpace);
    }
    async getParkingPositionByPosNumber(req, res) {
        const { parkingspaceId, positionnumber } = req.params;
        const parkingSpace = await _parkingSpaceService.getParkingPositionByPosNumber(parkingspaceId, positionnumber);
        return res.send(parkingSpace);
    }
    async updateParkingPositionByPosnumber(req, res) {

        const { parkingspaceId, positionnumber } = req.params;
        const { body } = req;
        const vehicleExist = await _vehicle.getUserByVehicleByPlate(body.plate);
        if (vehicleExist) {
            body.vehicle = vehicleExist._id;
        }
        const parkingSpace = await _parkingSpaceService.updateParkingPositionByPosnumber(parkingspaceId, positionnumber, body);
        return res.send(parkingSpace);
    }
    async deleteParkingPositionByPosnumber(req, res) {
        try {
            const { parkingspaceId, positionnumber } = req.params;
            return _parkingSpaceService.deleteParkingPositionByPosnumber(parkingspaceId, positionnumber)
            .then((parkingSpace) => {
                if (parkingSpace == null) {
                    const err = new Error();
                    err.status = 404;
                    err.message = `positionnumber :${positionnumber} or parkingspaceId: ${parkingspaceId} not found!`;
                    throw err;                }

                return res.status(200).send(parkingSpace);
            });
        }
        catch (error) {
            return res.status(500).send(error);
        }
    }
    async createParkingPositions(req, res) {
        const { body } = req;
        const { parkingspaceId } = req.params;
        const positionExist = await _parkingSpaceService.getParkingPositionByPosNumber(parkingspaceId, body.posnumber);
        if (positionExist) {
            const error = new Error();
            error.status = 409;
            error.message = "position already exist";
            throw error;
        }
        const parkingSpace = await _parkingSpaceService.createParkingPositions(parkingspaceId, body).then((parkingSpace) => {
            if (parkingSpace == null) {
                const err = new Error();
                err.status = 404;
                err.message = `parkingspaceId: ${parkingspaceId} not found!`;
                throw err;
            }

            return res.status(201).send(parkingSpace);
        });
        return res.send(parkingSpace);
    }
}

module.exports = ParkingSpaceController
