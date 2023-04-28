const BaseRepository = require("./base.repository");

class BillRepository extends BaseRepository {
  constructor({ Bill }) {
    super(Bill);
    this.repository = Bill;
  }
}

module.exports = BillRepository;
