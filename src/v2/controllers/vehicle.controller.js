import bindMethods from "../../utils/bindMethods.js";
import BaseController from "./base.controller.js";

class VehicleController extends BaseController {
  constructor({ VehicleService }) {
    super(VehicleService);
    this.service = VehicleService;
    bindMethods(this);
  }
}

export default VehicleController;
