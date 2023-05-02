import bindMethods from "../../utils/bindMethods.js";
import BaseController from "./base.controller.js";

class ParkingSpotController extends BaseController {
  constructor({ ParkingSpotService }) {
    super(ParkingSpotService);
    this.service = ParkingSpotService;
    bindMethods(this);
  }
}

export default ParkingSpotController;
