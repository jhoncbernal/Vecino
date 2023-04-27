const BaseController = require("./base.controller");
let _guestService = null;

class GuestController extends BaseController {
  constructor({ GuestService }) {
    super(GuestService);
    _guestService = GuestService;
  }
}

module.exports = GuestController;
