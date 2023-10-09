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
      const userPopulate = [
        {
          path: "photo",
          model: "File",
          select: "fileUrl",
        },
        {
          path: "auth",
          model: "Auth",
          select: "email enabled isVerified",
        },
      ];
      const model = await this.model
        .findById(id, "owners tenants guests parkingSpace")
        .select(fields)
        .populate({
          path: "owners",
          select: "photo auth",
          populate: userPopulate,
        })
        .populate({
          path: "tenants",
          select: "photo auth",
          populate: userPopulate,
        })
        .populate({
          path: "guests",
          select: "photo auth",
          populate: userPopulate,
        })
        .populate("parkingSpace")
        .lean()
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

      // Only select the required fields: _id, unitNumber, owners, notificationWay
      const fields = "_id unitNumber owners notificationWay building";

      // Find models by unitNumber and accessible by ability
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

      // Count only the documents that match the unitNumber query and are accessible by ability
      const total = await this.model
        .accessibleBy(ability)
        .countDocuments({ unitNumber: new RegExp(unitNumber, "i") });

      return {
        data: models,
        meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
      };
    } catch (error) {
      console.error(error);
      // Replace handleMongoError with your own error handling logic
      throw handleMongoError(error);
    }
  }

  async getAllUsersByBuilding(buildingId) {
    try {
      const userPopulate = [
        {
          path: "auth",
          model: "Auth",
          select: "email enabled isVerified",
        },
      ];
      const models = await this.model
        .find({ building: buildingId })
        .populate({
          path: "owners",
          select: "auth",
          populate: userPopulate,
        })
        .populate({
          path: "tenants",
          select: "auth",
          populate: userPopulate,
        })
        .lean()
        .exec();

      return models;
    } catch (error) {
      console.error(error);
      throw handleMongoError(error);
    }
  }

  async getAllRecidentialUnitsByBuilding(buildingId, ability) {
    try {
      const models = await this.model
        .find({ building: buildingId })
        .lean()
        .select("_id unitNumber")
        .exec();

      return models;
    } catch (error) {
      console.error(error);
      throw handleMongoError(error);
    }
  }
}

export default RecidentialUnitRepository;
