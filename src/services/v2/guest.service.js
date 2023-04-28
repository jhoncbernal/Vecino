const BaseService = require("./base.service");
class GuestRepository extends BaseService {
  constructor({ GuestRepository }) {
    super(GuestRepository);
    this.repository = GuestRepository;
  }
}

module.exports = GuestRepository;
