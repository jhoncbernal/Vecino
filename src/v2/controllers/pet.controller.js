import bindMethods from "../../utils/bindMethods.js";
import BaseController from "./base.controller.js";

class PetController extends BaseController {
  constructor({ PetService }) {
    super(PetService);
    this.service = PetService;
    bindMethods(this);
  }
}

export default PetController;
