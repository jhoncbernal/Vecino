import BaseController from "./base.controller.js";

class AddressController extends BaseController {
  constructor({ AddressService }) {
    super(AddressService);
    this.service = AddressService;
  }
}
export default AddressController;
