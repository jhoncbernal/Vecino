const BaseRepository = require("./base.repository");
let _bill = null;

class BillRepository extends BaseRepository {
  constructor({ Bill }) {
    super(Bill);
    _bill = Bill;
  }
}

module.exports = BillRepository;
