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

  async getByUnitNumber(unitNumber, pageNumber, pageSize, ability) {
    try {
      const page = Math.max(0, pageNumber);
      const limit = Math.max(1, pageSize);
      const fields = this._getAccessibleFields(ability);

      const models = await this.model
        .accessibleBy(ability)
        .find({ unitNumber: new RegExp(unitNumber, "i") })
        .select(fields)
        .sort({ _id: 1 }) // sort by _id (replace with your preferred sort)
        .skip((page - 1) * limit)
        .collation({ locale: "es", strength: 1 })
        .limit(limit)
        .lean() // return plain JavaScript objects
        .exec();

      const total = await this.model.accessibleBy(ability).countDocuments();
      return {
        data: models,
        meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
      };
    } catch (error) {
      console.error(error);
      throw handleMongoError(error);
    }
  }
}

export default RecidentialUnitRepository;
