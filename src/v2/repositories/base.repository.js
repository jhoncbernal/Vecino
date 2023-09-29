import { handleMongoError } from "../../utils/mongoErrorHandler.util.js";
import { permittedFieldsOf } from "@casl/ability/extra";
class BaseRepository {
  constructor(model, eventBus) {
    this.model = model;
    this.eventBus = eventBus;
  }
  // Get a single model by ID
  async getById(modelId, ability) {
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
      const page = Math.max(0, pageNumber);
      const limit = Math.max(1, pageSize);
      const fields = this._getAccessibleFields(ability);
      const total = await this.model.accessibleBy(ability).countDocuments();

      const models = await this.model
        .accessibleBy(ability)
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
  async create(modelData, user) {
    try {
      const saved = await new this.model(modelData).save();
      if (!saved) throw new Error("Unable to create model");
      const { _doc } = saved;
     /*  await this.eventBus.emit(`${this.model.modelName}.created`, {
        model: _doc,
        user,
      }); */
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

  _getAccessibleFields(ability) {
    const options = { fieldsFrom: (rule) => rule.fields || [] };
    const fields = permittedFieldsOf(
      ability,
      "read",
      this.model.modelName,
      options
    );
    return fields.length ? fields.join(" ") : null;
  }
}

export default BaseRepository;
