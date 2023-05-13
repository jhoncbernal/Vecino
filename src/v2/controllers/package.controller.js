import bindMethods from "../../utils/bindMethods.js";
import BaseController from "./base.controller.js";

class PackageController extends BaseController {
  constructor({ PackageService, logger }) {
    super(PackageService, logger);
    this.service = PackageService;
    bindMethods(this);
  }
}

export default PackageController;
