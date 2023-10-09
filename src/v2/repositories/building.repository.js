import BaseRepository from "./base.repository.js";

class BuildingRepository extends BaseRepository {
  constructor({ Building, eventBus }) {
    super(Building, eventBus);
    this.model = Building;
  }
  // Get all models with pagination
  async getAll(pageNumber, pageSize, ability) {
    try {
      const page = Math.max(0, pageNumber);
      const limit = Math.max(1, pageSize);
      const fields = this._getAccessibleFields(ability);
      const total = await this.model.accessibleBy(ability).countDocuments();

      const models = await this.model
        .accessibleBy(ability)
        .populate({
          path: "photo",
          select: ["fileUrl"],
        })
        .select(fields)
        .skip((page - 1) * limit)
        .limit(limit)
        .exec();

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

export default BuildingRepository;
