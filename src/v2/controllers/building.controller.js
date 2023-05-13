import bindMethods from "../../utils/bindMethods.js";
import BaseController from "./base.controller.js";

class BuildingController extends BaseController {
  constructor({ BuildingService, logger }) {
    super(BuildingService, logger);
    this.service = BuildingService;
    bindMethods(this);
  }
}

export default BuildingController;
