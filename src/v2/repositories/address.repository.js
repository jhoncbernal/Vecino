import BaseRepository from "./base.repository.js";

class AddressRepository extends BaseRepository {
  constructor({ Address, eventBus }) {
    super(Address, eventBus);
    this.model = Address;
  }

  async create(address, user) {
    const oldAddress = await this.model.findOne({longitute: address.longitute, latitude: address.latitude}).lean();
    if (oldAddress) {
      return oldAddress;
    }
    const newAddress = await this.model.create(address);
    return newAddress;
  }
}
export default AddressRepository;
