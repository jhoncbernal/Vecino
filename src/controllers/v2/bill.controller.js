const BaseController = require("./base.controller");
let _billService = null;

class BillController extends BaseController {
  constructor({ BillService }) {
    super(BillService);
    _billService = BillService;
  }
}

module.exports = BillController;
