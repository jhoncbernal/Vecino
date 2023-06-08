import BaseRepository from "./base.repository.js";

class AddressRepository extends BaseRepository {
  constructor({ Address, eventBus }) {
    super(Address, eventBus);
    this.model = Address;
  }
}

export default AddressRepository;
