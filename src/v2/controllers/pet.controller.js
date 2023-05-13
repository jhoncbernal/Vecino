import bindMethods from "../../utils/bindMethods.js";
import BaseController from "./base.controller.js";

class PetController extends BaseController {
  constructor({ PetService, logger }) {
    super(PetService, logger);
    this.service = PetService;
    bindMethods(this);
  }
}

export default PetController;
