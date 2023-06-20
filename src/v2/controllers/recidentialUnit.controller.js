import bindMethods from "../../utils/bindMethods.js";
import BaseController from "./base.controller.js";
class RecidentialUnitController extends BaseController {
  constructor({ RecidentialUnitService, logger }) {
    super(RecidentialUnitService, logger);
    this.service = RecidentialUnitService;
    bindMethods(this);
  }
  async getUsersRecidentialUnit(req, res) {
    const { id } = req.params;
    const { ability } = req;
    try {
      const result = await this.service.getUsersRecidentialUnit(
        id,
        req.query,
        ability
      );
      res.send(result);
    } catch (error) {
      this.logger.error(error);
      return res
        .status(error?.statusCode || 400)
        .send({ message: error.message });
    }
  }

  async getByUnitNumber(req, res) {
    const { unitNumber } = req.params;
    const { ability } = req;
    try {
      const result = await this.service.getByUnitNumber(
        unitNumber,
        req.query.pageNumber || 1,
        req.query.pageSize || 10,
        ability
      );
      res.send(result);
    } catch (error) {
      this.logger.error(error);
      return res
        .status(error?.statusCode || 400)
        .send({ message: error.message });
    }
  }
}

export default RecidentialUnitController;
