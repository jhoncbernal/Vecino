const BaseService = require("./base.service");
let _bill = null;

class BillRepository extends BaseService {
  constructor({ Bill }) {
    super(Bill);
    _bill = Bill;
  }
}

module.exports = BillRepository;
