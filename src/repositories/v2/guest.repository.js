const BaseRepository = require("./base.repository");

class GuestRepository extends BaseRepository {
  constructor({ Guest }) {
    super(Guest);
    this.repository = Guest;
  }
}

module.exports = GuestRepository;
