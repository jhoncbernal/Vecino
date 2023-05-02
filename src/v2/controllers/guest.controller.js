import bindMethods from "../../utils/bindMethods.js";
import BaseController from "./base.controller.js";

class GuestController extends BaseController {
  constructor({ GuestService }) {
    super(GuestService);
    this.service = GuestService;
    bindMethods(this);
  }
}

export default GuestController;
