import BaseController from "./base.controller.js";

class AddressController extends BaseController {
  constructor({ AddressService, logger }) {
    super(AddressService, logger);
    this.service = AddressService;
  }
}
export default AddressController;
