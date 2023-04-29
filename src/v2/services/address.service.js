const BaseService = require('./base.service');

class AddressService extends BaseService {
  constructor({ AddressRepository }) {
    super(AddressRepository);
    this.repository = AddressRepository;
  }
}

module.exports = AddressService;