import bindMethods from "../../utils/bindMethods.js";
import BaseController from "./base.controller.js";

class BillController extends BaseController {
  constructor({ BillService, logger }) {
    super(BillService, logger);
    this.service = BillService;
    bindMethods(this);
  }
}

export default BillController;
