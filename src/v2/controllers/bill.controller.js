import bindMethods from "../../utils/bindMethods.js";
import BaseController from "./base.controller.js";

class BillController extends BaseController {
  constructor({ BillService }) {
    super(BillService);
    this.service = BillService;
    bindMethods(this);
  }
}

export default BillController;
