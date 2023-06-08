import BaseRepository from "./base.repository.js";
import { handleMongoError } from "../../utils/mongoErrorHandler.util.js";

class RecidentialUnitRepository extends BaseRepository {
  constructor({ RecidentialUnit, eventBus }) {
    super(RecidentialUnit, eventBus);
    this.model = RecidentialUnit;
  }
  async getUsersRecidentialUnit(id, query, ability) {
    try {
      const fields = this._getAccessibleFields(ability);

      const models = await this.model
        .accessibleBy(ability)
        .select(fields)
        .skip((page - 1) * limit)
        .limit(limit)
        .exec();

      return models;
    } catch (error) {
      console.error(error);
      throw handleMongoError(error);
    }
  }
  async getById(id, ability) {
    try {
      const fields = this._getAccessibleFields(ability);

      const model = await this.model
        .findById(id)
        .select(fields)
        .populate({
          path: "owners",
          populate: {
            path: "photo",
            model: "File",
          },
        })
        .populate("tenants")
        .populate("guests")
        .populate("parkingSpace")
        .exec();

      return model;
    } catch (error) {
      console.error(error);
      throw handleMongoError(error);
    }
  }

}

export default RecidentialUnitRepository;
