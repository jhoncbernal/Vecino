const bindMethods = require("../../utils/bindMethods");
const BaseController = require("./base.controller");

class GuestController extends BaseController {
  constructor({ GuestService }) {
    super(GuestService);
    this.service = GuestService;
    bindMethods(this);
  }
}

module.exports = GuestController;
