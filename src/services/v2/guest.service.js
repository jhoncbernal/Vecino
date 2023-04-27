const BaseService = require("./base.service");
let _guest = null;

class GuestRepository extends BaseService {
  constructor({ Guest }) {
    super(Guest);
    _guest = Guest;
  }
}

module.exports = GuestRepository;
