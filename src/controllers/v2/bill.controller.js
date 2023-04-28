const bindMethods = require("../../utils/bindMethods");
const BaseController = require("./base.controller");

class BillController extends BaseController {
  constructor({ BillService }) {
    super(BillService);
    this.service = BillService;
    bindMethods(this);
  }
}

module.exports = BillController;
