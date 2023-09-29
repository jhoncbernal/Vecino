import bindMethods from "../../utils/bindMethods.js";
import BaseController from "./base.controller.js";

class PackageController extends BaseController {
  constructor({ PackageService, logger }) {
    super(PackageService, logger);
    this.service = PackageService;
    bindMethods(this);
  }
  async getAllCarriers(req, res) {
    try {
      const couriers = await this.service.getAllCouriers();
      return res.status(200).json(couriers);
    } catch (error) {
      this.logger.error(error);
      return res.status(500).json({ message: error.message });
    }
  }
}

export default PackageController;
