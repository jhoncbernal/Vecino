import BaseService from "./base.service.js";

class AddressService extends BaseService {
  constructor({ AddressRepository }) {
    super(AddressRepository);
    this.repository = AddressRepository;
  }
}

export default AddressService;
