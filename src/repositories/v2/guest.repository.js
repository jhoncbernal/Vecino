const BaseRepository = require("./base.repository");
let _guest = null;

class GuestRepository extends BaseRepository {
  constructor({ Guest }) {
    super(Guest);
    _guest = Guest;
  }
}

module.exports = GuestRepository;
