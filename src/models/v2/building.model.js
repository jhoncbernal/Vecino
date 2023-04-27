const { v4: uuidv4 } = require("uuid");

const buildingSchema = new Schema({
  _id: { type: String, default: uuidv4 },
  name: String,
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
  },
  workers: [workerSchema],
  guestParkingLot: {
    cars: [{ type: String, ref: "ParkingSpot" }],
    bikes: [{ type: String, ref: "ParkingSpot" }],
    motorcycles: [{ type: String, ref: "ParkingSpot" }],
    others: [{ type: String, ref: "ParkingSpot" }],
  },
  residentParkingLot: {
    cars: [{ type: String, ref: "ParkingSpot" }],
    bikes: [{ type: String, ref: "ParkingSpot" }],
    motorcycles: [{ type: String, ref: "ParkingSpot" }],
    others: [{ type: String, ref: "ParkingSpot" }],
  },
});

const Building = mongoose.model("Building", buildingSchema);
module.exports = { Building };
