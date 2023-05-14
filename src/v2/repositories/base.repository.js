import { handleMongoError } from "../../utils/mongoErrorHandler.util.js";
class BaseRepository {
  constructor(model) {
    this.model = model;
  }
  // Get a single model by ID
  async getById(modelId) {
    try {
      const model = await this.model.findById(modelId).exec();
      if (!model) {
        throw new Error(`${this.model.modelName} Not found`);
      }
      return model;
    } catch (error) {
      console.error(error);
      throw handleMongoError(error);
    }
  }

  // Get all models with pagination
  async getAll(pageNumber, pageSize, ability) {
    try {
      const { projection, query } =
        this._extractProjectionAndConditionsFromAbility(ability);
      const pipeline = [
        query,
        { $skip: (pageNumber - 1) * pageSize },
        { $limit: pageSize },
      ];

      if (Object.keys(projection).length > 0) {
        pipeline.splice(1, 0, { $project: projection });
      }

      const models = await this.model.aggregate(pipeline).exec();

      return models;
    } catch (error) {
      console.error(error);
      throw handleMongoError(error);
    }
  }
  // Get by condition
  async getByCondition(condition) {
    try {
      const model = this.model.findOne(condition).exec();
      return model;
    } catch (error) {
      console.error(error);
      throw handleMongoError(error);
    }
  }

  // Get all models that match a condition
  async getAllByCondition(condition) {
    try {
      const models = await this.model.find(condition).exec();
      return models;
    } catch (error) {
      console.error(error);
      throw handleMongoError(error);
    }
  }

  // Delete a single model by ID
  async deleteById(modelId) {
    try {
      const result = await this.model.deleteOne({ _id: modelId });
      return result.deletedCount;
    } catch (error) {
      console.error(error);
      throw handleMongoError(error);
    }
  }

  // Delete multiple models that match a condition
  async deletesByCondition(condition) {
    try {
      const result = await this.model.deleteMany(condition);
      return result.deletedCount;
    } catch (error) {
      console.error(error);
      throw handleMongoError(error);
    }
  }

  // Create a single model
  async create(modelData) {
    try {
      const saved = await new this.model(modelData).save();
      if (!saved) throw new Error("Unable to create model");
      const { _doc } = await this.getById(saved?._id);
      return _doc;
    } catch (error) {
      console.error(error);
      throw handleMongoError(error);
    }
  }

  // Create multiple models
  async creates(modelsData) {
    try {
      const result = await this.model.insertMany(modelsData);
      const createdModels = await this.getAllByCondition({
        _id: { $in: result.insertedIds },
      });
      return createdModels;
    } catch (error) {
      console.error(error);
      throw handleMongoError(error);
    }
  }

  // Update a single model by ID
  async updateById(modelId, updatedData) {
    try {
      const result = await this.model
        .updateOne({ _id: modelId }, updatedData)
        .exec();
      return result.nModified;
    } catch (error) {
      console.error(error);
      throw handleMongoError(error);
    }
  }

  // Update multiple models that match a condition
  async updateByCondition(condition, updatedData) {
    try {
      const result = await this.model.updateMany(condition, updatedData).exec();
      return result.nModified;
    } catch (error) {
      console.error(error);
      throw handleMongoError(error);
    }
  }
  _extractProjectionAndConditionsFromAbility(ability) {
    const action = ability.action;
    const subject = ability.subject;
    const rules = ability.rules.filter(
      (rule) => rule.action === action && rule.subject === subject
    );

    const result = rules.reduce(
      (acc, rule) => {
        if (rule.conditions && rule.conditions.$project) {
          Object.assign(acc.projection, rule.conditions.$project);
          // Clone the conditions object to remove the $project property
          const conditionsWithoutProjection = { ...rule.conditions };
          delete conditionsWithoutProjection.$project;
          acc.conditions.push(conditionsWithoutProjection);
        } else if (rule.conditions) {
          acc.conditions.push(rule.conditions);
        }
        return acc;
      },
      { projection: {}, conditions: [] }
    );

    const query = result.conditions.length
      ? { $match: { $or: result.conditions } }
      : { $match: {} };
    return { ...result, query };
  }
}

export default BaseRepository;
