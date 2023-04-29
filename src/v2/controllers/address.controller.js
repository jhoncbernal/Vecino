const BaseController = require("./base.controller");

class AddressController extends BaseController {
  constructor({ AddressService }) {
    super(AddressService);
    this.service = AddressService;
  }
}
module.exports = AddressController;
