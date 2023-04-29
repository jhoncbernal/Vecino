const BaseRepository = require("./base.repository");

class AddressRepository extends BaseRepository {
  constructor({ Address }) {
    super(Address);
    this.repository = Address;
  }
}

module.exports = AddressRepository;
