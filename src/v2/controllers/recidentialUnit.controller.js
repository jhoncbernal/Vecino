import bindMethods from "../../utils/bindMethods.js";
import BaseController from "./base.controller.js";

class RecidentialUnitController extends BaseController {
  constructor({ RecidentialUnitService, logger }) {
    super(RecidentialUnitService, logger);
    this.service = RecidentialUnitService;
    bindMethods(this);
  }
}

export default RecidentialUnitController;
