import BaseRepository from "./base.repository.js";

class AddressRepository extends BaseRepository {
  constructor({ Address }) {
    super(Address);
    this.model = Address;
  }
}

export default AddressRepository;
