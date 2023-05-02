import bindMethods from "../../utils/bindMethods.js";
import BaseController from "./base.controller.js";

class BuildingController extends BaseController {
  constructor({ BuildingService }) {
    super(BuildingService);
    this.service = BuildingService;
    bindMethods(this);
  }
}

export default BuildingController;
