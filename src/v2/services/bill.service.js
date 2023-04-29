const BaseService = require("./base.service");
class BillRepository extends BaseService {
  constructor({ BillRepository }) {
    super(BillRepository);
    this.repository = BillRepository;
  }
}

module.exports = BillRepository;
