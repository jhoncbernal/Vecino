import bindMethods from "../../utils/bindMethods.js";
import BaseController from "./base.controller.js";

class RecidentialUnitController extends BaseController {
  constructor({ RecidentialUnitService }) {
    super(RecidentialUnitService);
    this.service = RecidentialUnitService;
    bindMethods(this);
  }
}

export default RecidentialUnitController;
